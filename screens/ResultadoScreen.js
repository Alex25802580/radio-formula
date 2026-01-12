import React, { useState } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Modal,
    Dimensions,
    StatusBar, // <- importamos StatusBar
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const ResultadoScreen = ({ route, navigation }) => {
    const { erd, pdcl, pdcr, wl, wr, cruces, agujeros, offset } = route.params;

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
        return L.toFixed(1);
    };

    const wlAjustado = wl + offset;
    const wrAjustado = wr - offset;

    const radioIzquierdo = calcularLongitudRadio({
        erd,
        pcd: pdcl,
        flangeOffset: wlAjustado,
        cruces,
        agujeros,
    });

    const radioDerecho = calcularLongitudRadio({
        erd,
        pcd: pdcr,
        flangeOffset: wrAjustado,
        cruces,
        agujeros,
    });

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
            console.log('Error saving wheel', error);
        }

        setModalVisible(false);
        navigation.navigate('SavedWheels');
    };

    return (
        <View style={styles.container}>
            {/* StatusBar blanca con texto oscuro */}
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            <Text style={styles.title}>Result</Text>

            {esSimetrico ? (
                <Text style={styles.result}>
                    Spoke length: {radioIzquierdo} mm
                </Text>
            ) : (
                <>
                    <Text style={styles.result}>
                        Left spoke: {radioIzquierdo} mm
                    </Text>
                    <Text style={styles.result}>
                        Right spoke (drive side): {radioDerecho} mm
                    </Text>
                </>
            )}

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.buttonText}>Save wheel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.buttonSecondary]}
                    onPress={() => navigation.popToTop()}
                >
                    <Text style={styles.buttonText}>Back to home</Text>
                </TouchableOpacity>
            </View>

            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Save wheel</Text>

                        <Text style={styles.modalLabel}>Rim name:</Text>
                        <TextInput
                            value={llanta}
                            onChangeText={setLlanta}
                            style={styles.modalInput}
                            placeholder="Enter rim name"
                            placeholderTextColor="#8E8E93"
                        />

                        <Text style={styles.modalLabel}>Hub name:</Text>
                        <TextInput
                            value={buje}
                            onChangeText={setBuje}
                            style={styles.modalInput}
                            placeholder="Enter hub name"
                            placeholderTextColor="#8E8E93"
                        />

                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={guardarRueda}
                        >
                            <Text style={styles.buttonText}>Save wheel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.modalButton, styles.buttonSecondary]}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: width * 0.05,
        paddingTop: height * 0.05,
        backgroundColor: '#FFFFFF', // <- fondo blanco
        alignItems: 'center',
    },

    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: height * 0.03,
        textAlign: 'center',
        color: '#1C1C1E',
        fontFamily: 'sans-serif-condensed',
    },

    result: {
        fontSize: 20,
        marginBottom: height * 0.015,
        textAlign: 'center',
        fontFamily: 'sans-serif-condensed',
        color: '#1C1C1E', 
    },

    buttonContainer: {
        marginTop: height * 0.03,
        width: '100%',
        alignItems: 'center',
    },

    button: {
        width: width * 0.93,
        backgroundColor: '#1100adff',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginVertical: height * 0.01,
        elevation: 5,
    },

    buttonSecondary: {
        backgroundColor: '#8E8E93',
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: 19,
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
        backgroundColor: '#FFFFFF', // <- fondo blanco
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
    },

    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#1C1C1E',
        fontFamily: 'sans-serif-condensed',
    },

    modalLabel: {
        fontSize: 16,
        marginBottom: 5,
        fontFamily: 'sans-serif-condensed',
        color: '#1C1C1E',
        alignSelf: 'flex-start',
    },

    modalInput: {
        width: '100%',
        height: 50,
        borderColor: '#D1D1D6',
        borderWidth: 1,
        borderRadius: 14,
        paddingHorizontal: 18,
        fontSize: 17,
        marginBottom: 15,
        fontFamily: 'sans-serif-condensed',
        backgroundColor: '#FFFFFF', // <- fondo blanco
        color: '#000',
    },

    modalButton: {
        width: '100%',
        backgroundColor: '#1100adff',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginVertical: 5,
    },
});

export default ResultadoScreen;
