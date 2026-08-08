# Spoke Calculator

Spoke Calculator es una aplicación desarrollada con React Native y Expo para calcular la longitud de los radios de una rueda de bicicleta a partir de las medidas de la llanta y el buje.

La aplicación nació de una necesidad real durante mi trabajo montando bicicletas y ruedas. Está publicada en Google Play y cuenta con más de 1.000 descargas.

[Ver Spoke Calculator en Google Play](https://play.google.com/store/apps/details?id=com.alejandrocifuentes.calculadoraderadios)

## ¿Qué calcula?

Para realizar el cálculo se introducen los siguientes datos:

- número de agujeros de la rueda;
- ERD (Effective Rim Diameter);
- offset de la llanta y su dirección;
- PCD izquierdo y derecho del buje (Pitch Circle Diameter);
- distancia de la brida izquierda y derecha respecto al centro del buje;
- número de cruces.

La aplicación calcula de forma independiente la longitud necesaria de los radios del lado izquierdo (non-drive side) y derecho (drive side).

## Cálculo

La lógica matemática está separada de la interfaz y se encuentra en:

```text
utils/spokeCalculator.js
```

Para cada lado de la rueda se utiliza la siguiente fórmula:

```text
L = sqrt(
  R² + r²
  - 2 × R × r × cos(alpha)
  + d²
)
```

Donde:

- `R` es la mitad del ERD;
- `r` es la mitad del PCD de la brida;
- `d` es la distancia entre la brida y el plano de la llanta;
- `alpha` se calcula a partir del número de radios y el número de cruces.

En llantas asimétricas, la aplicación ajusta las distancias izquierda y derecha según el offset y la dirección seleccionada.

## Tests

La lógica del cálculo se puede comprobar de manera independiente mediante tests automáticos.

Actualmente se comprueban casos como:

- rueda de 32 agujeros y 3 cruces;
- medidas diferentes en ambos lados del buje;
- radiado radial;
- offset hacia drive side y non-drive side;
- valores decimales introducidos con punto o coma;
- medidas inválidas o físicamente incoherentes.

Para ejecutar los tests:

```bash
npm test
```

## Ruedas guardadas

Los cálculos se pueden guardar localmente en el dispositivo mediante AsyncStorage.

Las ruedas nuevas guardan tanto el resultado como las medidas utilizadas para realizar el cálculo. La aplicación también mantiene compatibilidad con las ruedas guardadas por versiones anteriores.

## Tecnologías

- React Native
- Expo
- JavaScript
- React Navigation
- AsyncStorage
- Node.js (tests)

## Ejecutar el proyecto

Se necesita:

- Node.js 18 o superior;
- npm;
- un entorno Android o Expo para ejecutar la aplicación.

Instalar las dependencias:

```bash
npm install
```

Ejecutar los tests:

```bash
npm test
```

Iniciar Expo:

```bash
npm start
```

Ejecutar en Android:

```bash
npm run android
```

## Estructura principal

```text
components/               Componentes reutilizables
screens/                  Pantallas de la aplicación
utils/spokeCalculator.js  Lógica de cálculo y validaciones
tests/                    Tests automáticos
```

## Sobre el proyecto

Spoke Calculator fue desarrollada de forma individual a partir de una necesidad real relacionada con el montaje de ruedas de bicicleta.

El objetivo del proyecto es ofrecer una herramienta sencilla para obtener la longitud correcta de los radios a partir de las medidas de una rueda, evitando depender de tablas o realizar el cálculo manualmente.

## Autor

Alejandro Cifuentes
