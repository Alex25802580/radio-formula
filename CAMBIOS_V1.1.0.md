# Spoke Calculator — Cambios técnicos de la versión 1.1.0

Fecha de documentación: 8 de agosto de 2026  
Rama de trabajo: `agent/spoke-calculator-refactor`

## 1. Objetivo del refactor

Esta actualización no busca cambiar la fórmula que ya utilizaba Spoke Calculator ni alterar los resultados que estaba ofreciendo la aplicación publicada. El objetivo es conservar el comportamiento matemático que ya funcionaba y mejorar la estructura interna de la aplicación para que sea más fácil de comprobar, mantener y reutilizar en una futura versión web.

Los cambios principales son:

- separar la lógica matemática de la interfaz de React Native;
- añadir tests automáticos para proteger los resultados del cálculo;
- validar medidas antes de calcular;
- aceptar tanto punto como coma decimal;
- hacer explícita la dirección del `rim offset`;
- transportar los datos como un único objeto `wheel`;
- eliminar código de interfaz repetido mediante componentes reutilizables;
- utilizar nombres de variables en inglés;
- mejorar el almacenamiento de ruedas sin romper los datos guardados por versiones anteriores;
- limpiar nombres, comentarios y estructura del proyecto;
- añadir documentación pública del proyecto;
- preparar la aplicación como versión `1.1.0`, con Android `versionCode: 2`.

## 2. La fórmula se ha separado de `ResultScreen`

### Antes

La fórmula matemática estaba declarada directamente dentro de `ResultadoScreen.js`:

```js
const calcularLongitudRadio = ({
  erd,
  pcd,
  flangeOffset,
  cruces,
  agujeros,
}) => {
  const alpha = (2 * Math.PI * cruces) / (agujeros / 2);

  const L = Math.sqrt(
    Math.pow(erd / 2, 2) +
      Math.pow(pcd / 2, 2) -
      2 * (erd / 2) * (pcd / 2) * Math.cos(alpha) +
      Math.pow(flangeOffset, 2)
  );

  return L.toFixed(1);
};
```

El cálculo era correcto, pero estaba acoplado a una pantalla de React Native. Eso significaba que para comprobar la fórmula había que pasar por la interfaz y que reutilizar el cálculo en una web obligaría a copiarlo o extraerlo más adelante.

### Ahora

La lógica está en:

```text
utils/spokeCalculator.js
```

La función matemática es independiente de React Native:

```js
function calculateSpokeLength({
  erd,
  pcd,
  flangeDistance,
  crosses,
  holes,
}) {
  const angle = (2 * Math.PI * crosses) / (holes / 2);

  return Math.sqrt(
    Math.pow(erd / 2, 2) +
      Math.pow(pcd / 2, 2) -
      2 * (erd / 2) * (pcd / 2) * Math.cos(angle) +
      Math.pow(flangeDistance, 2)
  );
}
```

La ecuación de la aplicación original se ha conservado. Se han cambiado los nombres de las variables para hacerlos más claros y consistentes, pero no la base matemática.

Además existe una función de nivel superior:

```js
calculateWheelSpokes(wheel)
```

Esta función valida la rueda, ajusta las distancias de las bridas según el offset y calcula de forma independiente el radio izquierdo y el derecho.

### Por qué se hizo

La matemática es lógica de dominio: debería poder ejecutarse sin una pantalla, sin navegación y sin React Native. Esto permite:

- probarla automáticamente;
- reutilizarla en la futura web;
- modificar la interfaz sin tocar la fórmula;
- detectar con más facilidad si un cambio futuro rompe el cálculo.

## 3. Tests automáticos de regresión

Se ha creado:

```text
tests/spokeCalculator.test.js
```

y se ha añadido a `package.json`:

```json
"test": "node --test"
```

Por tanto, los tests pueden ejecutarse con:

```bash
npm test
```

Actualmente existen 8 pruebas automáticas. En la comprobación realizada durante el refactor el resultado fue:

```text
tests 8
pass 8
fail 0
```

### Ejemplo de test de regresión

```js
test('keeps the original 32-hole, 3-cross calculation unchanged', () => {
  const length = calculateSpokeLength({
    erd: 600,
    pcd: 58,
    flangeDistance: 35,
    crosses: 3,
    holes: 32,
  });

  assert.equal(length.toFixed(1), '292.2');
});
```

Este test no intenta crear una fórmula nueva. Su objetivo es fijar un resultado de la implementación original: después del refactor, esa configuración debe continuar produciendo `292.2 mm`.

También hay pruebas para:

- bujes con medidas distintas a izquierda y derecha;
- radiado radial (`0 crosses`);
- offset hacia `drive side`;
- offset hacia `non-drive side`;
- decimales escritos con coma;
- valores vacíos o físicamente inverosímiles;
- relaciones imposibles como un PCD mayor que el ERD.

## 4. Validación física de los datos

### Antes

Las pantallas comprobaban principalmente que hubiera un valor y que JavaScript pudiera interpretarlo como número:

```js
if (!erd || isNaN(Number(erd))) {
  Alert.alert(
    'Invalid value',
    'Please enter a valid number in millimeters.'
  );
  return;
}
```

Esto evitaba introducir texto normal, pero no impedía valores como un ERD negativo o medidas completamente fuera de escala.

### Ahora

Las validaciones están centralizadas junto a la lógica del cálculo:

```js
const LIMITS = {
  erd: { min: 100, max: 1000 },
  pcd: { min: 10, max: 300 },
  flangeDistance: { min: 0, max: 150 },
  rimOffset: { min: 0, max: 30 },
};
```

Existe una función común:

```js
function validateMeasurement(value, { label, min, max }) {
  const parsed = parseDecimal(value);

  if (!Number.isFinite(parsed)) {
    return {
      valid: false,
      message: `Please enter a valid number for ${label}. You can use a dot or comma for decimals.`,
    };
  }

  if (parsed < min || parsed > max) {
    return {
      valid: false,
      message: `${label} must be between ${min} and ${max} mm.`,
    };
  }

  return { valid: true, value: parsed };
}
```

Además se comprueban relaciones entre medidas. Por ejemplo:

```js
if (wheel.leftPcd >= wheel.erd || wheel.rightPcd >= wheel.erd) {
  return { valid: false, message: 'PCD must be smaller than ERD.' };
}
```

### Por qué se hizo

Una calculadora puede aplicar correctamente una ecuación a unos datos absurdos y devolver un número igualmente absurdo. La validación impide que un error de introducción de datos parezca un resultado válido.

Los límites elegidos son deliberadamente amplios para cubrir configuraciones de bicicleta poco habituales sin aceptar magnitudes evidentemente erróneas.

## 5. Soporte para coma decimal

### Antes

Los valores acababan pasando por conversiones como:

```js
Number(value)
parseFloat(value)
```

Una entrada habitual en España y otros países europeos como:

```text
35,5
```

no se interpreta igual que:

```text
35.5
```

### Ahora

Antes de convertir el valor se normaliza:

```js
function normalizeDecimalInput(value) {
  if (typeof value === 'number') return value.toString();
  return String(value ?? '').trim().replace(',', '.');
}
```

Por tanto:

```text
35.5 -> 35.5
35,5 -> 35.5
```

Ambos formatos terminan en el mismo valor numérico.

## 6. El `rim offset` tiene ahora una dirección explícita

### Antes

La aplicación pedía un valor de offset y más adelante realizaba:

```js
const wlAjustado = wl + offset;
const wrAjustado = wr - offset;
```

La operación funcionaba con la convención utilizada por la aplicación, pero la interfaz solo indicaba:

```text
Enter 0 mm if the rim is symmetric
```

No explicaba claramente hacia qué lado debía interpretarse un offset positivo.

### Ahora

La pantalla `Rim Offset` permite seleccionar explícitamente:

```text
Drive side
Non-drive side
```

El objeto de la rueda guarda, por ejemplo:

```js
{
  rimOffset: 2.5,
  rimOffsetDirection: 'drive'
}
```

El ajuste se realiza en la lógica matemática:

```js
function getAdjustedFlangeDistances(wheel) {
  const offset = wheel.rimOffset ?? 0;
  const signedOffset =
    wheel.rimOffsetDirection === RIM_OFFSET_DIRECTIONS.NON_DRIVE
      ? -offset
      : offset;

  return {
    left: wheel.leftFlangeDistance + signedOffset,
    right: wheel.rightFlangeDistance - signedOffset,
  };
}
```

### Por qué se hizo

La aplicación ya conocía cómo debía afectar el offset a cada lado, pero el usuario tenía que conocer implícitamente la convención. Ahora el dato es explícito y queda almacenado junto al resto de la rueda.

## 7. Un único objeto `wheel`

### Antes

Las medidas se pasaban individualmente de una pantalla a otra mediante React Navigation:

```js
navigation.navigate('WrWl', {
  pdcl: parseFloat(pdcl),
  pdcr: parseFloat(pdcr),
  erd,
  agujeros,
  offset,
});
```

A medida que avanzaba el formulario, cada pantalla tenía que conocer y volver a enviar todos los parámetros anteriores.

### Ahora

Todos los datos pertenecen a una misma estructura:

```js
const wheel = {
  holes: 32,
  erd: 600,
  rimOffset: 2.5,
  rimOffsetDirection: 'drive',
  leftPcd: 58,
  rightPcd: 58,
  leftFlangeDistance: 35,
  rightFlangeDistance: 20,
  crosses: 3,
};
```

Cada pantalla añade únicamente su información:

```js
navigation.navigate('WrWl', {
  wheel: {
    ...wheel,
    leftPcd: leftValidation.value,
    rightPcd: rightValidation.value,
  },
});
```

### Por qué se hizo

La rueda es una única entidad. Representarla como un objeto hace más fácil:

- añadir nuevos campos;
- guardarla completa;
- enviarla al motor de cálculo;
- reutilizar el mismo modelo de datos en la versión web;
- evitar listas de parámetros cada vez más largas.

## 8. Componentes reutilizables para las pantallas

### Antes

`ERDScreen`, `PDCScreen`, `WrWlScreen` y otras pantallas repetían estructuras muy similares de:

- `KeyboardAwareScrollView`;
- título y subtítulo;
- imagen explicativa;
- `TextInput`;
- botón `Next`;
- estilos de inputs, botones, imágenes y contenedores.

Esto provocaba muchas líneas duplicadas. Un cambio visual en los inputs, por ejemplo, obligaba a modificar varias pantallas.

### Ahora

Se han creado:

```text
components/MeasurementScreen.js
components/ChoiceScreen.js
```

Una pantalla como ERD queda reducida a su responsabilidad específica:

```jsx
<MeasurementScreen
  title="ERD"
  subtitle="Effective Rim Diameter"
  imageSource={require('../assets/what-is-erd.png')}
  fields={[{ key: 'erd', placeholder: 'Enter ERD in mm' }]}
  onNext={handleNext}
/>
```

PCD reutiliza el mismo componente con dos campos:

```jsx
<MeasurementScreen
  title="PCD"
  subtitle="Pitch Circle Diameter"
  imageSource={require('../assets/PDC.png')}
  fields={[
    { key: 'leftPcd', placeholder: 'PCD Left – Non-drive side (mm)' },
    { key: 'rightPcd', placeholder: 'PCD Right – Drive side (mm)' },
  ]}
  onNext={handleNext}
/>
```

### Por qué se hizo

Las pantallas siguen teniendo contenido diferente, pero comparten la presentación. El código común queda en un solo sitio y cada pantalla conserva únicamente la lógica que la diferencia.

## 9. Nombres en inglés y limpieza general

Se han sustituido nombres como:

```text
agujeros        -> holes
cruces          -> crosses
llanta          -> rimName
buje            -> hubName
radioIzquierdo  -> leftSpoke
radioDerecho    -> rightSpoke
```

También se han sustituido los archivos:

```text
ResultadoScreen.js   -> ResultScreen.js
RuedasGuardadas.js   -> SavedWheelsScreen.js
```

Los archivos antiguos se eliminaron de la rama después de actualizar sus imports. Al estar todo versionado con Git, siguen siendo recuperables desde el historial si alguna vez fuera necesario.

## 10. `radioformulafinalboss` pasa a `spoke-calculator`

### Antes

`package.json` contenía:

```json
"name": "radioformulafinalboss"
```

### Ahora

```json
"name": "spoke-calculator"
```

El cambio también se sincronizó en `package-lock.json`.


## 11. Mejora del sistema de ruedas guardadas

### Antes

Al guardar una rueda se almacenaba principalmente:

```js
const nuevaRueda = {
  id: Date.now().toString(),
  llanta,
  buje,
  radioIzquierdo,
  radioDerecho,
};
```

Se conservaba el resultado, pero no los datos que habían producido ese resultado.

### Ahora

Una rueda nueva se guarda así:

```js
const savedWheel = {
  id: Date.now().toString(),
  rimName: cleanRimName,
  hubName: cleanHubName,
  leftSpoke: result.leftRounded,
  rightSpoke: result.rightRounded,
  wheel,
};
```

Ahora se conserva también el objeto `wheel` completo. Esto permitirá en el futuro mostrar los parámetros originales, duplicar un cálculo o editar una rueda sin perder la información inicial.

### Compatibilidad con usuarios de la versión anterior

No se cambió la clave de AsyncStorage:

```js
const STORAGE_KEY = 'ruedas';
```

Además, `SavedWheelsScreen` reconoce tanto el formato nuevo como el antiguo:

```js
const rimName = item.rimName ?? item.llanta ?? '';
const hubName = item.hubName ?? item.buje ?? '';
const leftSpoke = item.leftSpoke ?? Number(item.radioIzquierdo);
const rightSpoke = item.rightSpoke ?? Number(item.radioDerecho);
```

Esta compatibilidad es importante en una actualización de Play Store: instalar la versión nueva no debe hacer que las ruedas que el usuario tenía guardadas dejen de mostrarse.

## 12. Corrección del refresco de `Saved Wheels`

### Antes

Las ruedas se cargaban mediante un `useEffect` que se ejecutaba al montar el componente:

```js
useEffect(() => {
  cargarRuedas();
}, []);
```

En React Navigation una pantalla puede seguir montada aunque el usuario navegue a otra. En determinadas secuencias era posible volver a `Saved Wheels` sin que el componente se montara de nuevo, por lo que una rueda recién guardada podía no aparecer inmediatamente.

### Ahora

Se utiliza `useFocusEffect`:

```js
useFocusEffect(
  useCallback(() => {
    loadWheels();
  }, [loadWheels])
);
```

La lista se vuelve a cargar cuando la pantalla recupera el foco.

## 13. Validación de nombres al guardar

La nueva versión evita guardar una rueda sin identificarla:

```js
if (!cleanRimName || !cleanHubName) {
  Alert.alert('Missing information', 'Enter a rim name and a hub name.');
  return;
}
```

Además se utiliza `trim()` para que una cadena formada solo por espacios no cuente como nombre válido.

## 14. README del repositorio

El repositorio público no tenía `README.md`. Ahora incluye:

- descripción de Spoke Calculator;
- contexto del problema real que resuelve;
- enlace a Google Play;
- parámetros que utiliza el cálculo;
- explicación resumida de la fórmula;
- tratamiento del offset;
- información sobre los tests;
- tecnologías utilizadas;
- instrucciones de instalación y ejecución;
- estructura principal del proyecto;
- autoría.

Esto es importante tanto para otros desarrolladores como para alguien que llegue al repositorio desde un CV.

## 15. Versión preparada como 1.1.0

`app.json` se ha preparado con:

```json
"version": "1.1.0"
```

y Android con:

```json
"versionCode": 2
```

También se ha sincronizado la versión de `package.json` y la raíz de `package-lock.json`.

El `versionCode` de Android debe aumentar para que Google Play acepte una actualización sobre una versión anterior con `versionCode: 1`.

Antes de publicar el AAB se debe confirmar que `2` sigue siendo superior al último `versionCode` que exista realmente en Play Console. Si Play Console ya tuviera una compilación posterior, deberá utilizarse un número superior.

## 16. Decisión deliberada: NO cambiar el identificador Android

Se ha conservado:

```text
com.alejandrocifuentes.calculadoraderadios
```

aunque parte del identificador esté en español.

No es una variable normal ni un nombre que convenga limpiar en una aplicación ya publicada: es el identificador del paquete Android que Google Play utiliza para reconocer la aplicación.

Cambiarlo supondría generar otra aplicación diferente a ojos de Google Play en lugar de una actualización de Spoke Calculator.

Por ese motivo, la norma de utilizar nombres en inglés se ha aplicado al código nuevo y a la estructura interna, pero no al identificador Android existente.

## 17. Qué NO se ha cambiado

Para reducir el riesgo de una actualización innecesariamente grande, se ha mantenido:

- la ecuación matemática base;
- el flujo general por pasos de la app móvil;
- la identidad de Android;
- la clave de almacenamiento `ruedas`;
- los recursos gráficos ya utilizados por las pantallas;
- la compatibilidad con los datos guardados por la versión publicada.

La versión web podrá utilizar una interfaz diferente, probablemente con la calculadora completa en una única página, sin necesidad de copiar el flujo visual de la aplicación móvil.

## 18. Verificaciones realizadas

Durante el refactor se ejecutaron los 8 tests automáticos y todos finalizaron correctamente:

```text
pass 8
fail 0
```

También se realizó una comprobación sintáctica sobre los 14 archivos JavaScript nuevos o modificados relevantes para el refactor. Todos fueron parseados correctamente, sin errores de sintaxis.

Esto no sustituye la prueba de una compilación Android real. Antes de fusionar la rama con `master` y antes de generar el AAB para Play Store se recomienda:

1. instalar dependencias;
2. ejecutar `npm test`;
3. generar una APK de prueba;
4. instalarla en un dispositivo Android real;
5. comparar varias ruedas reales con la versión actualmente publicada;
6. comprobar especialmente una llanta simétrica y una asimétrica;
7. comprobar guardado, cierre/reapertura, listado y borrado de ruedas;
8. solo después fusionar/publicar la actualización.

## 19. Resultado arquitectónico

Antes, la pantalla de resultado contenía tanto responsabilidades de interfaz como parte de la lógica matemática, y las pantallas iban pasándose parámetros individuales.

Después del refactor la separación conceptual es:

```text
components/
  ChoiceScreen.js
  MeasurementScreen.js

screens/
  ...flujo y presentación de React Native...

utils/
  spokeCalculator.js
  ...cálculo, normalización y validación...

tests/
  spokeCalculator.test.js
  ...regresiones matemáticas...
```

La ventaja más importante es que `utils/spokeCalculator.js` ya no depende de React Native. Ese archivo constituye el núcleo del cálculo y puede servir de base para la futura Spoke Calculator Web.

## 20. Resumen

La versión 1.1.0 convierte una aplicación que ya funcionaba correctamente en una base técnica más mantenible sin intentar reinventar su cálculo.

La mejora principal no es que la fórmula produzca ahora un resultado distinto, sino precisamente lo contrario: la fórmula se ha aislado y protegido con tests para garantizar que una reorganización importante del código siga ofreciendo los mismos resultados conocidos.

Sobre esa base se añaden validación, soporte de coma decimal, dirección explícita del rim offset, un modelo de datos `wheel`, componentes reutilizables, almacenamiento más completo, compatibilidad hacia atrás y documentación del repositorio.

Esto deja el proyecto en una posición mucho mejor tanto para futuras actualizaciones Android como para reutilizar el motor matemático en la versión web.
