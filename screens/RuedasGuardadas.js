import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

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

            <TouchableOpacity
                style={styles.homeButton}
                onPress={() => navigation.navigate("Home")}
            >
                <Text style={styles.buttonText}>Volver al inicio</Text>
            </TouchableOpacity>

            <FlatList
                data={ruedas}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <View style={styles.itemInfo}>
                            <Text style={styles.name}>Llanta: {item.llanta}</Text>
                            <Text style={styles.name}>Buje: {item.buje}</Text>
                            <Text style={styles.radioText}>Radio izquierdo: {item.radioIzquierdo} mm</Text>
                            <Text style={styles.radioText}>Radio derecho: {item.radioDerecho} mm</Text>
                        </View>
                        <TouchableOpacity onPress={() => eliminarRueda(item.id)} style={styles.deleteButton}>
                            <Text style={styles.deleteText}>X</Text>
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>No hay ruedas guardadas todavía</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: width * 0.05,
        paddingTop: height * 0.05,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 15,
        fontFamily: 'sans-serif-condensed',
        textAlign: 'center',
        color: '#333',
    },
    homeButton: {
        width: width * 0.93,
        backgroundColor: '#007AFF',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 25,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-condensed',
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
        marginRight: 10,
    },
    name: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#000",
        marginBottom: 3,
        fontFamily: 'sans-serif-condensed',
    },
    radioText: {
        fontSize: 16,
        color: "#555",
        marginBottom: 2,
        fontFamily: 'sans-serif-condensed',
    },
    deleteButton: {
        width: width * 0.1,
        height: width * 0.1,
        borderRadius: width * 0.05,
        backgroundColor: "#FF3B30",
        justifyContent: "center",
        alignItems: "center",
    },
    deleteText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#555',
        fontFamily: 'sans-serif-condensed',
    }
});

export default SavedWheelsScreen;
