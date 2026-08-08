import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Keyboard,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width, height } = Dimensions.get('window');

const MeasurementScreen = ({
  title,
  subtitle,
  imageSource,
  fields,
  onNext,
}) => {
  const [values, setValues] = useState(() =>
    Object.fromEntries(fields.map((field) => [field.key, field.initialValue ?? '']))
  );

  const handleNext = () => {
    Keyboard.dismiss();

    try {
      onNext(values);
    } catch (error) {
      Alert.alert('Invalid value', error.message);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.screen}
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid
      extraScrollHeight={120}
      keyboardOpeningTime={0}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}

          {imageSource ? (
            <View style={styles.imageCard}>
              <Image source={imageSource} style={styles.image} />
            </View>
          ) : null}

          <View style={styles.inputsContainer}>
            {fields.map((field, index) => (
              <TextInput
                key={field.key}
                style={styles.input}
                placeholder={field.placeholder}
                placeholderTextColor="#8E8E93"
                keyboardType={Platform.OS === 'ios' ? 'decimal-pad' : 'numeric'}
                value={values[field.key]}
                onChangeText={(value) =>
                  setValues((current) => ({ ...current, [field.key]: value }))
                }
                returnKeyType={index === fields.length - 1 ? 'done' : 'next'}
              />
            ))}

            <TouchableOpacity
              onPress={handleNext}
              style={styles.button}
              activeOpacity={0.85}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#FFFFFF',
  },
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
    color: '#000000',
    marginBottom: 12,
  },
  button: {
    width: '100%',
    backgroundColor: '#1100ad',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    elevation: 5,
    marginTop: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '700',
  },
});

export default MeasurementScreen;
