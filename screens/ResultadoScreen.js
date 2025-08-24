import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResultadoScreen = ({ route, navigation }) => {
    const { erd, pdcl, pdcr, wl, wr, cruces, agujeros } = route.params;

    const [modalVisible, setModalVisible] = useState(false);
    const [llanta, setLlanta] = useState("");
    const [buje, setBuje] = useState("");

    const calcularLongitudRadio = ({ erd, pcd, flangeOffset, cruces, agujeros }) => {
        // α = ángulo entre agujeros de la misma ala según nº de cruces
        const alpha = (2 * Math.PI * cruces) / (agujeros / 2);

        // Fórmula clásica
        let L = Math.sqrt(
            Math.pow(erd / 2, 2) +
            Math.pow(pcd / 2, 2) -
            2 * (erd / 2) * (pcd / 2) * Math.cos(alpha) +
            Math.pow(flangeOffset, 2)
        );

        // Ajuste típico por asiento de cabecilla/nipple
        L = L - 2;

        const roundedL = Math.round(L);
        return `${roundedL - 1}-${roundedL + 1}`;
    };

    const radioIzquierdo = calcularLongitudRadio({ erd, pcd: pdcl, flangeOffset: wl, cruces, agujeros });
    const radioDerecho = calcularLongitudRadio({ erd, pcd: pdcr, flangeOffset: wr, cruces, agujeros });

    const guardarRueda = async () => {
        const nuevaRueda = {
            id: Date.now().toString(),
            llanta,
            buje,
            radioIzquierdo,
            radioDerecho,
        };

        try {
            const data = await AsyncStorage.getItem("ruedas");
            const ruedas = data ? JSON.parse(data) : [];
            ruedas.push(nuevaRueda);
            await AsyncStorage.setItem("ruedas", JSON.stringify(ruedas));
        } catch (error) {
            console.log("Error al guardar rueda", error);
        }

        setModalVisible(false);
        navigation.navigate("SavedWheels");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Resultado</Text>
            <Text style={styles.result}>Radio izquierdo: {radioIzquierdo} mm</Text>
            <Text style={styles.result}>Radio derecho: {radioDerecho} mm</Text>

            <View style={styles.buttonContainer}>
                <Button title="Volver al inicio" onPress={() => navigation.popToTop()} />
                <Button title="Guardar" onPress={() => setModalVisible(true)} />
            </View>

            <Modal visible={modalVisible} animationType="slide">
                <View style={{ padding: 20 }}>
                    <Text>Nombre de la llanta:</Text>
                    <TextInput
                        value={llanta}
                        onChangeText={setLlanta}
                        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
                    />
                    <Text>Nombre del buje:</Text>
                    <TextInput
                        value={buje}
                        onChangeText={setBuje}
                        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
                    />
                    <Button title="Guardar rueda" onPress={guardarRueda} />
                    <Button title="Cancelar" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#333',
        fontFamily: 'sans-serif-condensed',

    },
    result: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
        color: '#007AFF',
    },
    buttonContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
});

export default ResultadoScreen;
