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
import DropDownPicker from 'react-native-dropdown-picker';

const { width, height } = Dimensions.get('window');

const HolesScreen = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [agujeros, setAgujeros] = useState(null);
  const [items, setItems] = useState([
    { label: '16 holes', value: 16 },
    { label: '18 holes', value: 18 },
    { label: '20 holes', value: 20 },
    { label: '24 holes', value: 24 },
    { label: '28 holes', value: 28 },
    { label: '32 holes', value: 32 },
    { label: '36 holes', value: 36 },
    { label: '40 holes', value: 40 },
    { label: '48 holes', value: 48 },
  ]);

  const handleNext = () => {
    if (!agujeros) {
      Alert.alert('Select a value', 'Please choose the number of holes.');
      return;
    }
    navigation.navigate('ERD', { agujeros });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.container}>
        <Text style={styles.title}>Select number of holes</Text>

        {/* Dropdown personalizado */}
        <View style={styles.dropdownWrapper}>
          <DropDownPicker
            open={open}
            value={agujeros}
            items={items}
            setOpen={setOpen}
            setValue={setAgujeros}
            setItems={setItems}
            placeholder="Choose an option..."
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            textStyle={styles.dropdownText}
            placeholderStyle={styles.placeholderStyle}
            arrowIconStyle={{ tintColor: '#666666' }}
            listMode="SCROLLVIEW"
            maxHeight={500}   // 🔥 permite mostrar todo sin scroll
          />
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
    zIndex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1C1C1E',
    textAlign: 'center',
    fontFamily: Platform.OS === 'android' ? 'sans-serif-condensed' : 'System',
  },

  /* DROPDOWN */
  dropdownWrapper: {
    width: width * 0.9,
    marginBottom: 25,
    zIndex: 1000, // 🔥 necesario en Android
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    height: 55,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 15,
    maxHeight: 500, // 🔥 evita que limite altura
  },
  dropdownText: {
    color: '#000000',
    fontSize: 16,
  },
  placeholderStyle: {
    color: '#999999',
  },

  button: {
    width: width * 0.9,
    backgroundColor: '#1100ad',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
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

export default HolesScreen;
