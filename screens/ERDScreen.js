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
  StatusBar,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width, height } = Dimensions.get('window');

const ERDScreen = ({ navigation, route }) => {
  const [erd, setErd] = useState('');

  const handleNext = () => {
    if (!erd || isNaN(Number(erd))) {
      Alert.alert(
        "Invalid value",
        "Please enter a valid number in millimeters."
      );
      return;
    }

    Keyboard.dismiss();

    setTimeout(() => {
      navigation.navigate("Offset", {
        erd: parseFloat(erd),
        agujeros: route.params?.agujeros,
      });
    }, 0);
  };

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: '#FFFFFF' }}
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
      extraScrollHeight={100} // Aumentado ligeramente para compensar teclados altos
      enableAutomaticScroll={true}
      keyboardOpeningTime={0}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>ERD</Text>

          <Text style={styles.subtitle}>
            Effective Rim Diameter
          </Text>

          <View style={styles.imageCard}>
            <Image
              source={require("../assets/what-is-erd.png")}
              style={styles.image}
            />
          </View>

          <View style={styles.inputsContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter ERD in mm"
              placeholderTextColor="#8E8E93"
              keyboardType="numeric"
              value={erd}
              onChangeText={setErd}
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
          
          {/* Espaciador extra para asegurar que el teclado no tape el botón */}
          <View style={{ height: 20 }} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingTop: height * 0.04,
    paddingBottom: height * 0.05, // Ajustado para no dejar demasiado aire abajo
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
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 17,
    color: '#6C6C70',
    textAlign: 'center',
    marginBottom: 18,
  },

  imageCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 26,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    backgroundColor: '#FFFFFF',
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

export default ERDScreen;