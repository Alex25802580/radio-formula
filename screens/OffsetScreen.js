import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar, // <- importamos StatusBar
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width, height } = Dimensions.get('window');

const OffsetScreen = ({ navigation, route }) => {
  const [offset, setOffset] = useState('');

  const handleNext = () => {
    if (offset === '' || isNaN(Number(offset))) {
      Alert.alert(
        "Invalid value",
        "Please enter a valid number in millimeters."
      );
      return;
    }

    Keyboard.dismiss();
    setTimeout(() => {
      navigation.navigate("PDC", {
        erd: route.params?.erd,
        agujeros: route.params?.agujeros,
        offset: parseFloat(offset),
      });
    }, 50);
  };

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: '#FFFFFF' }} // <- fondo blanco
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid
      extraScrollHeight={60}
    >
      {/* StatusBar blanca con texto oscuro */}
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Rim Offset</Text>

          <Text style={styles.subtitle}>
            Enter 0 mm if the rim is symmetric
          </Text>

          <View style={styles.imageCard}>
            <Image
              source={require("../assets/imagenOffset.png")}
              style={styles.image}
            />
          </View>

          <View style={styles.inputsContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter offset in mm"
              placeholderTextColor="#8E8E93"
              keyboardType="numeric"
              value={offset}
              onChangeText={setOffset}
              returnKeyType="done"
            />
          </View>

          <TouchableOpacity
            onPress={handleNext}
            style={styles.button}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingTop: height * 0.04,
    paddingBottom: height * 0.06,
  },

  container: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: width * 0.06,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1C1C1E',
    textAlign: 'center',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 17,
    color: '#6C6C70',
    textAlign: 'center',
    marginBottom: 18,
  },

  imageCard: {
    width: '100%',
    backgroundColor: '#FFFFFF', // <- fondo blanco
    borderRadius: 22,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 26,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },

  image: {
    width: width * 0.85,
    height: height * 0.21,
    resizeMode: 'contain',
  },

  inputsContainer: {
    width: '100%',
    marginBottom: 16,
  },

  input: {
    width: '100%',
    height: 56,
    borderRadius: 14,
    paddingHorizontal: 18,
    fontSize: 17,
    backgroundColor: '#FFFFFF', // <- fondo blanco
    borderWidth: 1,
    borderColor: '#D1D1D6',
    color: '#000',
  },

  button: {
    width: '100%',
    backgroundColor: '#1100adff',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    elevation: 5,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '700',
  },
});

export default OffsetScreen;
