import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get("window");


const IMAGE_SIZE = width * 0.55;            
const TOP_PADDING = height * 0.17;         
const BUTTON_WIDTH = width * 0.93;          
const BUTTON_MARGIN_TOP = height * 0.09;  

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image source={require("../assets/Spokey.png")} style={styles.image} />

            <Text style={styles.title}>Calculadora de radios</Text>

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
        justifyContent: 'flex-start',
        paddingTop: TOP_PADDING,
        paddingHorizontal: width * 0.1, 
    },

    title: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
fontFamily: 'sans-serif-condensed'
    },

    image: {
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        marginBottom: 16,
        resizeMode: 'contain',
    },

    buttonContainer: {
        width: "100%",
        alignItems: "center",
        marginTop: BUTTON_MARGIN_TOP,
    },

    button: {
        width: BUTTON_WIDTH,
        backgroundColor: '#007AFF',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
    },

    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
