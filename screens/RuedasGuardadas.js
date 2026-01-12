import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Dimensions,
    StatusBar, // <- importamos StatusBar
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
                console.log("Error loading wheels", error);
            }
        };
        cargarRuedas();
    }, []);

    const eliminarRueda = (id) => {
        Alert.alert(
            "Delete wheel",
            "Are you sure you want to delete this wheel?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        const nuevasRuedas = ruedas.filter(r => r.id !== id);
                        setRuedas(nuevasRuedas);
                        await AsyncStorage.setItem(
                            "ruedas",
                            JSON.stringify(nuevasRuedas)
                        );
                    }
                }
            ]
        );
    };

    const renderItem = ({ item }) => {
        const esSimetrica = item.radioIzquierdo === item.radioDerecho;

        return (
            <View style={styles.item}>
                <View style={styles.itemInfo}>
                    <Text style={styles.name}>Rim: {item.llanta}</Text>
                    <Text style={styles.name}>Hub: {item.buje}</Text>

                    {esSimetrica ? (
                        <Text style={styles.radioText}>
                            Spoke length: {item.radioIzquierdo} mm
                        </Text>
                    ) : (
                        <>
                            <Text style={styles.radioText}>
                                Left spoke: {item.radioIzquierdo} mm
                            </Text>
                            <Text style={styles.radioText}>
                                Right spoke (drive side): {item.radioDerecho} mm
                            </Text>
                        </>
                    )}
                </View>

                <TouchableOpacity
                    onPress={() => eliminarRueda(item.id)}
                    style={styles.deleteButton}
                >
                    <Text style={styles.deleteText}>X</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* StatusBar blanca con texto oscuro */}
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            <View style={styles.container}>
                <Text style={styles.title}>Saved Wheels</Text>

                <TouchableOpacity
                    style={styles.homeButton}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Text style={styles.buttonText}>Back to Home</Text>
                </TouchableOpacity>

                <FlatList
                    data={ruedas}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: height * 0.05 }}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>
                            No wheels saved yet
                        </Text>
                    }
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FFFFFF", // fondo blanco
    },
    container: {
        flex: 1,
        paddingHorizontal: width * 0.05,
        paddingTop: height * 0.02,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 15,
        fontFamily: 'sans-serif-condensed',
        textAlign: 'center',
        color: '#1C1C1E',
    },
    homeButton: {
        width: width * 0.93,
        backgroundColor: '#1100adff',
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
        marginBottom: 25,
        elevation: 5,
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
        borderRadius: 12,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#D1D1D6",
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
        fontSize: 14,
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
