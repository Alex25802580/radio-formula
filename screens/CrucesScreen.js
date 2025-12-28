import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const CrucesScreen = ({ navigation, route }) => {
  const [cruces, setCruces] = useState(null);

  const opciones = [
    { label: '0 cruces (Radial)', value: 0 },
    { label: '1 cruce', value: 1 },
    { label: '2 cruces', value: 2 },
    { label: '3 cruces', value: 3 },
  ];

  const handleNext = () => {
    if (cruces === null) {
      Alert.alert(
        'Selecciona un valor',
        'Por favor, elige un número de cruces.'
      );
      return;
    }

    navigation.navigate('Resultado', {
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
        value={cruces}
        useNativeAndroidPickerStyle={false}
        style={pickerSelectStyles}
        Icon={() => (
          <Ionicons name="chevron-down" size={24} color="#666" />
        )}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleNext} style={styles.button}>
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: height * 0.08,
    paddingHorizontal: width * 0.05,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    fontFamily: 'sans-serif-condensed',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: height * 0.05,
    alignItems: 'center',
  },
  button: {
    width: width * 0.93,
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const pickerSelectStyles = {
  inputAndroid: {
    fontSize: 16,
    fontFamily: 'sans-serif-condensed',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 30,
    color: 'black',
    paddingRight: 40, // espacio para la flecha
    marginBottom: 10,
  },
  iconContainer: {
    top: 12,
    right: 12,
  },
};

export default CrucesScreen;
