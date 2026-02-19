import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker'; 

const { width, height } = Dimensions.get('window');

const CrucesScreen = ({ navigation, route }) => {
  const [cruces, setCruces] = useState(null);

  const opciones = [
    { label: ' 0 crosses (Radial)', value: 0 },
    { label: ' 1 cross', value: 1 },
    { label: ' 2 crosses', value: 2 },
    { label: ' 3 crosses', value: 3 },
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
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.container}>
        <Text style={styles.title}>Select number of crosses</Text>

        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={cruces}
            onValueChange={(itemValue) => setCruces(itemValue)}
            dropdownIconColor="#666666"
            mode="dropdown"
            style={styles.pickerElement}
          >
            <Picker.Item label=" Choose an option..." value={null} color="#999" />
            {opciones.map((opt) => (
              <Picker.Item 
                key={opt.value} 
                label={opt.label} 
                value={opt.value} 
                color="#000"
              />
            ))}
          </Picker>
        </View>

        <TouchableOpacity 
          onPress={handleNext} 
          style={styles.button} 
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: height * 0.04,
    paddingHorizontal: width * 0.05,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1C1C1E',
    textAlign: 'center',
    fontFamily: Platform.OS === 'android' ? 'sans-serif-condensed' : 'System',
  },
  pickerWrapper: {
    width: width * 0.9,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    justifyContent: 'center',
    height: 55,
    marginBottom: 25,
  },
  pickerElement: {
    width: '100%',
    color: '#000000',
  },
  button: {
    width: width * 0.9,
    backgroundColor: '#1100ad',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
  },
});

export default CrucesScreen;