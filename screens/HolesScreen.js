import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const HolesScreen = ({ navigation }) => {
    const [agujeros, setAgujeros] = useState(null);

    const opciones = [
        { label: '16 agujeros', value: 16 },
        { label: '20 agujeros', value: 20 },
        { label: '24 agujeros', value: 24 },
        { label: '28 agujeros', value: 28 },
        { label: '32 agujeros', value: 32 },
        { label: '36 agujeros', value: 36 },
    ];

    const handleNext = () => {
        if (!agujeros) {
            Alert.alert("Selecciona un valor", "Por favor, elige un número de agujeros.");
            return;
        }

        navigation.navigate("ERD", { agujeros });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Selecciona el número de agujeros</Text>
            <RNPickerSelect
                onValueChange={(value) => setAgujeros(value)}
                items={opciones}
                placeholder={{ label: 'Elige una opción...', value: null }}
                style={pickerSelectStyles}
                value={agujeros}
            />
            {agujeros && <Text style={styles.selected}>Seleccionado: {agujeros}</Text>}

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
        fontFamily: 'sans-serif-condensed',

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

export default HolesScreen;
