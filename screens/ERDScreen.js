import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, Image, TouchableOpacity, Keyboard, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const ERDScreen = ({ navigation, route }) => {
    const [erd, setErd] = useState('');

    const handleNext = () => {
        if (!erd || isNaN(erd)) {
            Alert.alert("Valor no válido", "Por favor ingresa un número válido en milímetros.");
            return;
        }
        navigation.navigate("PDC", {
            erd: parseFloat(erd),
            agujeros: route.params.agujeros,
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>ERD - Diámetro efectivo de la llanta</Text>

            <Image source={require("../assets/what-is-erd.png")} style={styles.image} />

            <TextInput
                style={styles.input}
                placeholder="Ingresa el ERD en mm"
                placeholderTextColor="#666"
                keyboardType="numeric"
                maxLength={3}
                value={erd}
                onChangeText={(text) => {
                    setErd(text);
                    if (text.length === 3) Keyboard.dismiss();
                }}
                />


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
        fontSize: 34,
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
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: 16,
        marginBottom: height * 0.03,
        marginTop: -height * 0.03,
    },
    button: {
        width: width * 0.93,
        backgroundColor: '#007AFF',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default ERDScreen;
