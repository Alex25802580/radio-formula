import React from 'react';
import { Alert } from 'react-native';
import ChoiceScreen from '../components/ChoiceScreen';

const CROSS_OPTIONS = [
  { label: '0 crosses (Radial)', value: 0 },
  { label: '1 cross', value: 1 },
  { label: '2 crosses', value: 2 },
  { label: '3 crosses', value: 3 },
];

const CrossesScreen = ({ navigation, route }) => {
  const wheel = route.params?.wheel ?? {};

  const handleNext = (crosses) => {
    if (crosses === null) {
      Alert.alert('Select a value', 'Please choose a number of crosses.');
      return;
    }

    navigation.navigate('Result', {
      wheel: {
        ...wheel,
        crosses,
      },
    });
  };

  return (
    <ChoiceScreen
      title="Select number of crosses"
      items={CROSS_OPTIONS}
      placeholder="Choose an option..."
      onNext={handleNext}
    />
  );
};

export default CrossesScreen;
