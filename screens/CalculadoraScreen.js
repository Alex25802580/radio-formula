import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CalculadoraScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Calculadora</Text>
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
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default CalculadoraScreen;
