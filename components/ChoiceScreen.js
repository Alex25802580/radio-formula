import React, { useState } from 'react';
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const { width, height } = Dimensions.get('window');

const ChoiceScreen = ({ title, items: initialItems, placeholder, onNext }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(initialItems);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.dropdownWrapper}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder={placeholder}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            textStyle={styles.dropdownText}
            placeholderStyle={styles.placeholder}
            listMode="SCROLLVIEW"
            maxHeight={500}
          />
        </View>

        <TouchableOpacity
          onPress={() => onNext(value)}
          style={styles.button}
          activeOpacity={0.8}
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
    paddingTop: height * 0.04,
    paddingHorizontal: width * 0.05,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
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
  dropdownWrapper: {
    width: width * 0.9,
    marginBottom: 25,
    zIndex: 1000,
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
    maxHeight: 500,
  },
  dropdownText: {
    color: '#000000',
    fontSize: 16,
  },
  placeholder: {
    color: '#999999',
  },
  button: {
    width: width * 0.9,
    backgroundColor: '#1100ad',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
  },
});

export default ChoiceScreen;
