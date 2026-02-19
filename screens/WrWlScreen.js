import React, { useState } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width, height } = Dimensions.get('window');

const WrWlScreen = ({ navigation, route }) => {
  const [wr, setWr] = useState('');
  const [wl, setWl] = useState('');

  const { pdcl, pdcr, erd, agujeros, offset } = route.params || {};

  const handleNext = () => {
    if (!wr || !wl || isNaN(Number(wr)) || isNaN(Number(wl))) {
      Alert.alert(
        "Invalid value",
        "Please enter valid numbers in millimeters for WL and WR."
      );
      return;
    }

    Keyboard.dismiss();
    setTimeout(() => {
      navigation.navigate("Cruces", {
        wr: parseFloat(wr),
        wl: parseFloat(wl),
        pdcl,
        pdcr,
        erd,
        agujeros,
        offset,
      });
    }, 50);
  };

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: '#FFFFFF' }}
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
      extraScrollHeight={140}
      enableAutomaticScroll={true}
      keyboardOpeningTime={0}
      viewIsInsideTabBar={true}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>WL / WR</Text>

          <Text style={styles.subtitle}>
            Hub center distance
          </Text>

          <View style={styles.imageCard}>
            <Image
              source={require("../assets/PDC.png")}
              style={styles.image}
            />
          </View>

          {/* Botón NEXT subido aquí, dentro del contenedor de inputs */}
          <View style={styles.inputsContainer}>
            <TextInput
              style={styles.input}
              placeholder="WL – Non-drive side (mm)"
              placeholderTextColor="#8E8E93"
              keyboardType="numeric"
              value={wl}
              onChangeText={setWl}
              returnKeyType="next"
            />

            <TextInput
              style={styles.input}
              placeholder="WR – Drive side (mm)"
              placeholderTextColor="#8E8E93"
              keyboardType="numeric"
              value={wr}
              onChangeText={setWr}
              returnKeyType="done"
            />

            <TouchableOpacity
              onPress={handleNext}
              style={styles.button}
              activeOpacity={0.85}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 40 }} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingTop: height * 0.04,
    paddingBottom: height * 0.05,
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
    marginBottom: 20,
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
    marginBottom: 12,
  },

  button: {
    width: '100%',
    backgroundColor: '#1100adff',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    elevation: 5,
    marginTop: 4, // Pegado al último input
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '700',
  },
});

export default WrWlScreen;