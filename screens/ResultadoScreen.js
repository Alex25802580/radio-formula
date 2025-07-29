import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ResultadoScreen = ({ route, navigation }) => {
    const { erd, pdcl, pdcr, wl, wr, cruces, agujeros } = route.params;

    const calcularLongitudRadio = ({ erd, pcd, flangeOffset, cruces, agujeros }) => {
        const pi = Math.PI;
        const alpha = (2 * pi * cruces) / (agujeros / 2);

        let L = Math.sqrt(
            Math.pow(erd / 2, 2) +
            Math.pow(pcd / 2, 2) -
            2 * (erd / 2) * (pcd / 2) * Math.cos(alpha) +
            Math.pow(flangeOffset, 2)
        );

        // Restar 3mm al resultado final, según lo solicitado previamente.
        L = L - 3;

        // Redondear el resultado a un número entero para el rango.
        const roundedL = Math.round(L);

        // Calcular el margen de +/- 1mm
        const lowerBound = roundedL - 1;
        const upperBound = roundedL + 1;

        // Devolver el resultado como un rango
        return `${lowerBound}-${upperBound}`;
    };

    const radioIzquierdo = calcularLongitudRadio({ erd, pcd: pdcl, flangeOffset: wl, cruces, agujeros });
    const radioDerecho = calcularLongitudRadio({ erd, pcd: pdcr, flangeOffset: wr, cruces, agujeros });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Resultado</Text>
            <Text style={styles.result}>Longitud del radio izquierdo: {radioIzquierdo} mm</Text>
            <Text style={styles.result}>Longitud del radio derecho: {radioDerecho} mm</Text>

            <View style={styles.buttonContainer}>
                <Button title="Volver al inicio" onPress={() => navigation.popToTop()} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    result: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
        color: '#007AFF',
    },
    buttonContainer: {
        marginTop: 40,
        alignItems: 'center',
    },
});

export default ResultadoScreen;
