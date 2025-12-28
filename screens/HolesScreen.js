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
      Alert.alert(
        'Selecciona un valor',
        'Por favor, elige un número de agujeros.'
      );
      return;
    }
    navigation.navigate('ERD', { agujeros });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona el número de agujeros</Text>

      <RNPickerSelect
        onValueChange={(value) => setAgujeros(value)}
        items={opciones}
        placeholder={{ label: 'Elige una opción...', value: null }}
        value={agujeros}
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

export default HolesScreen;
