import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Alert,
    Image,
    TouchableOpacity,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const PDCScreen = ({ navigation, route }) => {
    const [pdcl, setPdcl] = useState('');
    const [pdcr, setPdcr] = useState('');

    const { erd, agujeros } = route.params;

    const handleNext = () => {
        if ((!pdcl && !pdcr) || isNaN(pdcl) || isNaN(pdcr)) {
            Alert.alert(
                "Valor no válido",
                "Por favor ingresa un número válido en milímetros."
            );
            return;
        }

        navigation.navigate("WrWl", {
            pdcl: parseFloat(pdcl),
            pdcr: parseFloat(pdcr),
            erd,
            agujeros,
        });
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.container}>
                <Text style={styles.title}>PCD L/R - Diámetro de la brida del buje</Text>

                <Image source={require("../assets/PDC.png")} style={styles.image} />

                <View style={styles.inputsContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="PCD L - Lado no transmisión en mm"
                        placeholderTextColor="#666"
                        keyboardType="numeric"
                        value={pdcl}
                        onChangeText={setPdcl}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="PCD R - Lado transmisión en mm"
                        placeholderTextColor="#666"
                        keyboardType="numeric"
                        value={pdcr}
                        onChangeText={setPdcr}
                    />
                </View>

                <TouchableOpacity onPress={handleNext} style={styles.button}>
                    <Text style={styles.buttonText}>Siguiente</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: width * 0.05,
        paddingTop: height * 0.05,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        fontFamily: 'sans-serif-condensed',
        marginBottom: height * 0.03,
    },
    image: {
        width: width * 0.8,
        height: height * 0.3,
        resizeMode: 'contain',
        marginBottom: height * 0.03,
    },
    inputsContainer: {
        width: '100%',
        marginTop: -height * 0.07,
        marginBottom: height * 0.03,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: 16,
        marginBottom: height * 0.01,
    },
    button: {
        width: width * 0.93,
        backgroundColor: '#007AFF',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: -height * 0.01,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default PDCScreen;
