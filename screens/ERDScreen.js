import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput, Button, Alert, Image} from 'react-native';

const ERDScreen = ({ navigation,route }) => {
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
                keyboardType="numeric"
                value={erd}
                onChangeText={setErd}
            />

            <Button title="Siguiente" onPress={handleNext} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        paddingTop: 40,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
        fontFamily: 'sans-serif-condensed',

    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
        fontSize: 16,
    },
    image: {
        width: 250,
        height: 250,
        marginBottom: 40,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
});

export default ERDScreen;
