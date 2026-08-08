import React, { useState } from 'react';
import {
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
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  RIM_OFFSET_DIRECTIONS,
  validateRimOffset,
} from '../utils/spokeCalculator';

const { width, height } = Dimensions.get('window');

const OffsetScreen = ({ navigation, route }) => {
  const wheel = route.params?.wheel ?? {};
  const [rimOffset, setRimOffset] = useState('');
  const [rimOffsetDirection, setRimOffsetDirection] = useState(
    RIM_OFFSET_DIRECTIONS.DRIVE
  );

  const handleNext = () => {
    const validation = validateRimOffset(rimOffset);

    if (!validation.valid) {
      Alert.alert('Invalid value', validation.message);
      return;
    }

    Keyboard.dismiss();
    navigation.navigate('PDC', {
      wheel: {
        ...wheel,
        rimOffset: validation.value,
        rimOffsetDirection,
      },
    });
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
          <Text style={styles.title}>Rim Offset</Text>
          <Text style={styles.subtitle}>
            Enter 0 mm for a symmetric rim. For an asymmetric rim, enter the
            offset and the direction the rim is shifted from the hub center.
          </Text>

          <View style={styles.imageCard}>
            <Image
              source={require('../assets/imagenOffset.png')}
              style={styles.image}
            />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Enter offset in mm"
            placeholderTextColor="#8E8E93"
            keyboardType={Platform.OS === 'ios' ? 'decimal-pad' : 'numeric'}
            value={rimOffset}
            onChangeText={setRimOffset}
            returnKeyType="done"
          />

          <Text style={styles.directionLabel}>Rim is offset toward:</Text>

          <View style={styles.directionRow}>
            <TouchableOpacity
              style={[
                styles.directionButton,
                rimOffsetDirection === RIM_OFFSET_DIRECTIONS.DRIVE &&
                  styles.directionButtonSelected,
              ]}
              onPress={() => setRimOffsetDirection(RIM_OFFSET_DIRECTIONS.DRIVE)}
            >
              <Text
                style={[
                  styles.directionText,
                  rimOffsetDirection === RIM_OFFSET_DIRECTIONS.DRIVE &&
                    styles.directionTextSelected,
                ]}
              >
                Drive side
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.directionButton,
                rimOffsetDirection === RIM_OFFSET_DIRECTIONS.NON_DRIVE &&
                  styles.directionButtonSelected,
              ]}
              onPress={() =>
                setRimOffsetDirection(RIM_OFFSET_DIRECTIONS.NON_DRIVE)
              }
            >
              <Text
                style={[
                  styles.directionText,
                  rimOffsetDirection === RIM_OFFSET_DIRECTIONS.NON_DRIVE &&
                    styles.directionTextSelected,
                ]}
              >
                Non-drive side
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.directionHelp}>
            The direction only affects the result when the offset is greater than 0 mm.
          </Text>

          <TouchableOpacity
            onPress={handleNext}
            style={styles.nextButton}
            activeOpacity={0.85}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
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
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
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
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: width * 0.85,
    height: height * 0.19,
    resizeMode: 'contain',
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
    marginBottom: 18,
  },
  directionLabel: {
    width: '100%',
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 10,
  },
  directionRow: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
  },
  directionButton: {
    flex: 1,
    minHeight: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D1D6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    backgroundColor: '#FFFFFF',
  },
  directionButtonSelected: {
    backgroundColor: '#1100ad',
    borderColor: '#1100ad',
  },
  directionText: {
    color: '#1C1C1E',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  directionTextSelected: {
    color: '#FFFFFF',
  },
  directionHelp: {
    width: '100%',
    color: '#6C6C70',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 8,
    marginBottom: 18,
  },
  nextButton: {
    width: '100%',
    backgroundColor: '#1100ad',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    elevation: 5,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '700',
  },
});

export default OffsetScreen;
