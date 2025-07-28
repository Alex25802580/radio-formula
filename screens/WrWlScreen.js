import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput, Button, Alert, Image} from 'react-native';

const WrWlScreen = ({ navigation }) => {
    const [wr, setWr] = useState('');
    const [wl, setWl] = useState('');


    const handleNext = () => {
        if (!wr && !wl || isNaN(wr) || isNaN(wl)) {
            Alert.alert("Valor no válido", "Por favor ingresa un número válido en milímetros.");
            return;
        }

        navigation.navigate("WrWl", { wr: parseFloat(wr), wl: parseFloat(wl) });

    };

    return (
        <View style={styles.container}>
            <Image source={require("../assets/PDC.png")} style={styles.image} />

            <Text style={styles.title}>WRWL -  Distancia de la ala </Text>

            <TextInput
                style={styles.input}
                placeholder="Ingresa el WL en mm"
                keyboardType="numeric"
                value={wl}
                onChangeText={setWl}
            />
            <TextInput
                style={styles.input}
                placeholder="Ingresa el WR en mm"
                keyboardType="numeric"
                value={wr}
                onChangeText={setWr}
            />

            <Button title="Siguiente" onPress={handleNext} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
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

    },
});

export default WrWlScreen;
