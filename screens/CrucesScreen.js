import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const CrucesScreen = ({ navigation, route }) => {
    const [cruces, setCruces] = useState(null);

    const opciones = [
        { label: '0 cruces', value: 0 },
        { label: '1 cruces', value: 1 },
        { label: '2 cruces', value: 2 },
        { label: '3 cruces', value: 3 },

    ];

    const handleNext = () => {
        if (!cruces) {
            Alert.alert("Selecciona un valor", "Por favor, elige un número de cruces.");
            return;
        }

        navigation.navigate("Resultado", {
            erd: route.params.erd,
            pdcl: route.params.pdcl,
            pdcr: route.params.pdcr,
            wl: route.params.wl,
            wr: route.params.wr,
            agujeros: route.params.agujeros,
            cruces,
        });
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Selecciona el número de cruces</Text>
            <RNPickerSelect
                onValueChange={(value) => setCruces(value)}
                items={opciones}
                placeholder={{ label: 'Elige una opción...', value: null }}
                style={pickerSelectStyles}
                value={cruces}
            />
            {cruces && <Text style={styles.selected}>Seleccionado: {cruces}</Text>}

            <View style={styles.buttonContainer}>
                <Button title="Siguiente" onPress={handleNext} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    selected: {
        marginTop: 20,
        fontSize: 18,
        color: '#007AFF',
    },
    buttonContainer: {
        marginTop: 30,
    },
});

const pickerSelectStyles = {
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
        marginBottom: 10,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
        marginBottom: 10,
    },
};

export default CrucesScreen;
