// CrucesScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  StatusBar, // <- importamos StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const CrucesScreen = ({ navigation, route }) => {
  const [cruces, setCruces] = useState(null);

  const opciones = [
    { label: '0 crosses (Radial)', value: 0 },
    { label: '1 cross', value: 1 },
    { label: '2 crosses', value: 2 },
    { label: '3 crosses', value: 3 },
  ];

  const handleNext = () => {
    if (cruces === null) {
      Alert.alert('Select a value', 'Please choose a number of crosses.');
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
      offset: route.params.offset,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* StatusBar blanca con texto oscuro */}
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.container}>
        <Text style={styles.title}>Select number of crosses</Text>

        <RNPickerSelect
          onValueChange={(value) => setCruces(value)}
          items={opciones}
          placeholder={{ label: 'Choose an option...', value: null }}
          value={cruces}
          useNativeAndroidPickerStyle={false}
          style={pickerSelectStyles}
          Icon={() => (
            <View pointerEvents="none" style={pickerSelectStyles.iconContainer}>
              <Ionicons name="chevron-down" size={24} color="#666" />
            </View>
          )}
        />

        <TouchableOpacity onPress={handleNext} style={styles.button} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF', // <- fondo blanco
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // <- fondo blanco
    paddingTop: height * 0.04,
    paddingHorizontal: width * 0.05,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1C1C1E',
    textAlign: 'center',
    fontFamily: 'sans-serif-condensed',
  },
  button: {
    width: width * 0.93,
    backgroundColor: '#1100adff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
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
    paddingRight: 40,
    marginBottom: 10,
    backgroundColor: '#FFFFFF', // <- background blanco
  },
  iconContainer: {
    top: 5,
    right: 5,
  },
};

export default CrucesScreen;
