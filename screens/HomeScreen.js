import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Calculadora de radios</Text>
            <Image source={require("../assets/fotoRueda.png")} style={styles.image} />
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("Calculadora")} style={styles.button}>
                    <Text style={styles.buttonText}>Calcular radios</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Camera")} style={[styles.button, styles.cameraButton]}>
                    <Text style={styles.buttonText}>Ver presets</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 60,
        paddingTop: 60,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    image: {
        width: 250,
        height: 250,
        marginBottom: 40,
    },
    buttonContainer: {
        width: '100%',
        position: 'flex',
        bottom: 40,
        alignItems: 'center',
    },
    button: {
        width: '80%',
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 8,
    },
    cameraButton: {
        backgroundColor: '#007AFF',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});

export default HomeScreen;



