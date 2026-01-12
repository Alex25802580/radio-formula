import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get("window");

const TITLE_IMAGE_SIZE = width * 1.05;
const APP_IMAGE_SIZE = width * 0.55;
const TOP_PADDING = height * 0.07;
const BUTTON_WIDTH = width * 0.9;
const BUTTON_MARGIN_TOP = height * 0.06;

const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            {/* StatusBar gris con texto oscuro */}
            <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

            <View style={styles.container}>

                {/* Imagen Título (NO se mueve) */}
                <Image 
                    source={require("../assets/letras.png")} 
                    style={styles.titleImage} 
                />

                {/* Todo lo demás sube ligeramente */}
                <View style={styles.contentBelowTitle}>

                    {/* Imagen App */}
                    <Image 
                        source={require("../assets/logoo.png")} 
                        style={styles.appImage} 
                    />

                    {/* Botones */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Holes")}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Calculate Spokes</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate("SavedWheels")}
                            style={[styles.button, styles.buttonSecondary]}
                        >
                            <Text style={styles.buttonText}>Saved Wheels</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },

    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: TOP_PADDING,
        paddingHorizontal: width * 0.07,
    },

   titleImage: {
    width: TITLE_IMAGE_SIZE,
    height: TITLE_IMAGE_SIZE * 0.55,
    resizeMode: 'contain',
    marginBottom:-5,
    backgroundColor: '#FAFAFA',
    transform: [{ translateX: 7 }], // ← AJUSTA ESTE VALOR
},

    contentBelowTitle: {
        marginTop: -40, 
        width: '100%',
        alignItems: 'center',
    },

    appImage: {
        width: APP_IMAGE_SIZE,
        height: APP_IMAGE_SIZE,
        resizeMode: 'contain',
        marginBottom: -5,
        backgroundColor: '#FAFAFA',
    },

    buttonContainer: {
        width: "100%",
        alignItems: "center",
        marginTop: BUTTON_MARGIN_TOP,
    },

    button: {
        width: BUTTON_WIDTH,
        backgroundColor: '#1100adff',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginVertical: 8,
        elevation: 5,
    },

    buttonSecondary: {
        backgroundColor: '#8E8E93',
    },

    buttonText: {
        color: '#fff',
        fontSize: 19,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-condensed',
    },
});

export default HomeScreen;
