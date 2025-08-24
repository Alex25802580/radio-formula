import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SavedWheelsScreen = () => {
    const [ruedas, setRuedas] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const cargarRuedas = async () => {
            try {
                const data = await AsyncStorage.getItem("ruedas");
                if (data !== null) {
                    setRuedas(JSON.parse(data));
                }
            } catch (error) {
                console.log("Error al cargar ruedas", error);
            }
        };
        cargarRuedas();
    }, []);

    const eliminarRueda = (id) => {
        Alert.alert(
            "Eliminar rueda",
            "¿Estás seguro de que deseas eliminar esta rueda?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        const nuevasRuedas = ruedas.filter(r => r.id !== id);
                        setRuedas(nuevasRuedas);
                        await AsyncStorage.setItem("ruedas", JSON.stringify(nuevasRuedas));
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ruedas guardadas</Text>

            {/* Botón separado del título */}
            <View style={styles.buttonContainer}>
                <Button
                    title="Volver al inicio"
                    onPress={() => navigation.navigate("Home")}
                    color="#007AFF"
                />
            </View>

            <FlatList
                data={ruedas}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <View style={styles.itemInfo}>
                            <Text style={styles.name}>Llanta: {item.llanta}</Text>
                            <Text>Buje: {item.buje}</Text>
                            <Text>Radio izquierdo: {item.radioIzquierdo} mm</Text>
                            <Text>Radio derecho: {item.radioDerecho} mm</Text>
                        </View>
                        <TouchableOpacity onPress={() => eliminarRueda(item.id)}>
                            <Ionicons name="trash-outline" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={<Text>No hay ruedas guardadas todavía</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 15,
        fontFamily: 'sans-serif-condensed',

    },
    buttonContainer: {
        marginBottom: 25, // más espacio entre el botón y la lista
    },
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
        marginBottom: 10,
        borderRadius: 8,
        backgroundColor: "#f1f1f1"
    },
    itemInfo: {
        flex: 1,
        marginRight: 10
    },
    name: {
        fontWeight: "bold"
    }
});

export default SavedWheelsScreen;
