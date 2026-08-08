import React from 'react';
import { Alert } from 'react-native';
import ChoiceScreen from '../components/ChoiceScreen';

const HOLE_OPTIONS = [16, 18, 20, 24, 28, 32, 36, 40, 48].map((holes) => ({
  label: `${holes} holes`,
  value: holes,
}));

const HolesScreen = ({ navigation }) => {
  const handleNext = (holes) => {
    if (holes === null) {
      Alert.alert('Select a value', 'Please choose the number of holes.');
      return;
    }

    navigation.navigate('ERD', {
      wheel: { holes },
    });
  };

  return (
    <ChoiceScreen
      title="Select number of holes"
      items={HOLE_OPTIONS}
      placeholder="Choose an option..."
      onNext={handleNext}
    />
  );
};

export default HolesScreen;
