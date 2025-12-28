import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    Modal, 
    Dimensions 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const ResultadoScreen = ({ route, navigation }) => {
    const { erd, pdcl, pdcr, wl, wr, cruces, agujeros } = route.params;

    const [modalVisible, setModalVisible] = useState(false);
    const [llanta, setLlanta] = useState('');
    const [buje, setBuje] = useState('');

    const calcularLongitudRadio = ({ erd, pcd, flangeOffset, cruces, agujeros }) => {
        const alpha = (2 * Math.PI * cruces) / (agujeros / 2);

        const L = Math.sqrt(
            Math.pow(erd / 2, 2) +
            Math.pow(pcd / 2, 2) -
            2 * (erd / 2) * (pcd / 2) * Math.cos(alpha) +
            Math.pow(flangeOffset, 2)
        );

        // Se usa toFixed(1) para comparar los valores como cadenas también, asegurando consistencia
        return L.toFixed(1); 
    };

    const radioIzquierdo = calcularLongitudRadio({ erd, pcd: pdcl, flangeOffset: wl, cruces, agujeros });
    const radioDerecho = calcularLongitudRadio({ erd, pcd: pdcr, flangeOffset: wr, cruces, agujeros });
    
    // Nueva lógica para determinar si el buje es simétrico y los radios son iguales
    const esSimetrico = radioIzquierdo === radioDerecho;

    const guardarRueda = async () => {
        const nuevaRueda = {
            id: Date.now().toString(),
            llanta,
            buje,
            radioIzquierdo,
            radioDerecho,
        };

        try {
            const data = await AsyncStorage.getItem('ruedas');
            const ruedas = data ? JSON.parse(data) : [];
            ruedas.push(nuevaRueda);
            await AsyncStorage.setItem('ruedas', JSON.stringify(ruedas));
        } catch (error) {
            console.log('Error al guardar rueda', error);
        }

        setModalVisible(false);
        navigation.navigate('SavedWheels');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Resultado</Text>
            
            {/* Lógica condicional para mostrar el resultado */}
            {esSimetrico ? (
                <Text style={styles.result}>Radio: {radioIzquierdo} mm</Text>
            ) : (
                <>
                    <Text style={styles.result}>Radio izquierdo: {radioIzquierdo} mm</Text>
                    <Text style={styles.result}>Radio derecho: (Lado transmisión) {radioDerecho} mm</Text>
                </>
            )}
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.popToTop()}>
                    <Text style={styles.buttonText}>Volver al inicio</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                    <Text style={styles.buttonText}>Guardar rueda</Text>
                </TouchableOpacity>
            </View>

            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Guardar rueda</Text>

                        <Text style={styles.modalLabel}>Nombre de la llanta:</Text>
                        <TextInput
                            value={llanta}
                            onChangeText={setLlanta}
                            style={styles.modalInput}
                        />

                        <Text style={styles.modalLabel}>Nombre del buje:</Text>
                        <TextInput
                            value={buje}
                            onChangeText={setBuje}
                            style={styles.modalInput}
                        />

                        <TouchableOpacity style={styles.modalButton} onPress={guardarRueda}>
                            <Text style={styles.buttonText}>Guardar rueda</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.modalButton, { backgroundColor: '#888' }]}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

// ... estilos sin cambios

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: width * 0.05,
        paddingTop: height * 0.05,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: height * 0.03,
        textAlign: 'center',
        color: '#333',
        fontFamily: 'sans-serif-condensed',
    },
    result: {
        fontSize: 19,
        marginBottom: height * 0.015,
        textAlign: 'center',
        fontFamily: 'sans-serif-condensed',
        color: '#007AFF',
    },
    buttonContainer: {
        marginTop: height * 0.03,
        width: '100%',
        alignItems: 'center',
    },
    button: {
        width: width * 0.93,
        backgroundColor: '#007AFF',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: height * 0.01,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-condensed',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        fontFamily: 'sans-serif-condensed',
    },
    modalLabel: {
        fontSize: 16,
        marginBottom: 5,
        fontFamily: 'sans-serif-condensed',
        color: '#333',
        alignSelf: 'flex-start',
    },
    modalInput: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: 16,
        marginBottom: 15,
        fontFamily: 'sans-serif-condensed',
    },
    modalButton: {
        width: '100%',
        backgroundColor: '#007AFF',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 5,
    },
});

export default ResultadoScreen;