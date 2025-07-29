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

        // Si tienes una siguiente pantalla, navega así:
        // navigation.navigate("OtraPantalla", { erd: parseFloat(erd) });
        navigation.navigate("WrWl", {
            pdcl: parseFloat(pdcl),
            pdcr: parseFloat(pdcr),
            erd: route.params.erd,
            agujeros: route.params.agujeros,
        });

    };

    return (
        <View style={styles.container}>
            <Image source={require("../assets/PDC.png")} style={styles.image} />

            <Text style={styles.title}>PDC -  Diámetro de taladrado del ala izquierda del buje</Text>

            <TextInput
                style={styles.input}
                placeholder="Ingresa el PDCL en mm"
                keyboardType="numeric"
                value={pdcl}
                onChangeText={setPdcl}
            />
            <TextInput
                style={styles.input}
                placeholder="Ingresa el PDCR en mm"
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

export default PDCScreen;
