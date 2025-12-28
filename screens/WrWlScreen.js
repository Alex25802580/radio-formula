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
} from 'react-native';

const { width, height } = Dimensions.get('window');

const WrWlScreen = ({ navigation, route }) => {
    const [wr, setWr] = useState('');
    const [wl, setWl] = useState('');

    const handleNext = () => {
        if (!wr || !wl || isNaN(wr) || isNaN(wl)) {
            Alert.alert("Valor no válido", "Por favor ingresa números válidos para WL y WR en milímetros.");
            return;
        }

        navigation.navigate("Cruces", {
            wr: parseFloat(wr),
            wl: parseFloat(wl),
            pdcl: route.params.pdcl,
            pdcr: route.params.pdcr,
            erd: route.params.erd,
            agujeros: route.params.agujeros,
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>WL/WR - Distancia de la ala al centro del buje</Text>

            <Image source={require("../assets/PDC.png")} style={styles.image} />

            <View style={styles.inputsContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="WL - Lado no transmisión en mm"
                    keyboardType="numeric"
                    value={wl}
                    onChangeText={setWl}
                />
                <TextInput
                    style={styles.input}
                    placeholder="WR - Lado transmisión en mm"
                    placeholderTextColor="#666"
                    keyboardType="numeric"
                    value={wr}
                    onChangeText={setWr}
                />
            </View>

            <TouchableOpacity onPress={handleNext} style={styles.button}>
                <Text style={styles.buttonText}>Siguiente</Text>
            </TouchableOpacity>
        </View>
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

export default WrWlScreen;
