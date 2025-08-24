import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Calculadora de radios</Text>
            <Image source={require("../assets/Spokey.png")} style={styles.image} />
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("Holes")} style={styles.button}>
                    <Text style={styles.buttonText}>Calcular radios</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("SavedWheels")} style={[styles.button, styles.cameraButton]}>
                    <Text style={styles.buttonText}>Ruedas guardadas</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center', // centra todo verticalmente
        paddingHorizontal: 40,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30, // separa un poco del logo
        fontFamily: 'sans-serif-condensed',
    },
    image: {
        width: 220,
        height: 220,
        marginBottom: 50, // más espacio antes de los botones
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    button: {
        width: '80%',
        backgroundColor: '#007AFF',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
