import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput, Button, Alert, Image} from 'react-native';

const PDCScreen = ({ navigation, route}) => {
    const [pdcl, setPdcl] = useState('');
    const [pdcr, setPdcr] = useState('');


    const handleNext = () => {
        if (!pdcl && !pdcr || isNaN(pdcl) || isNaN(pdcr)) {
            Alert.alert("Valor no válido", "Por favor ingresa un número válido en milímetros.");
            return;
        }

        navigation.navigate("WrWl", {
            pdcl: parseFloat(pdcl),
            pdcr: parseFloat(pdcr),
            erd: route.params.erd,
            agujeros: route.params.agujeros,
        });

    };

    return (
        <View style={styles.container}>

            <Text style={styles.title}>PDC -  Diámetro de la brida del buje</Text>
            <Image source={require("../assets/PDC.png")} style={styles.image} />

            <TextInput
                style={styles.input}
                placeholder="Ingresa el PDC L en mm"
                keyboardType="numeric"
                value={pdcl}
                onChangeText={setPdcl}
            />
            <TextInput
                style={styles.input}
                placeholder="Ingresa el PDC R en mm"
                keyboardType="numeric"
                value={pdcr}
                onChangeText={setPdcr}
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
        paddingTop: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
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
        marginBottom: 10,
        fontSize: 16,
    },
    image: {
        width: 250,
        height: 250,
        marginBottom: 20,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    button: {
        marginTop: 10,
    },
});

export default PDCScreen;
