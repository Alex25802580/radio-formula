import React from 'react';
import MeasurementScreen from '../components/MeasurementScreen';
import { validatePcd } from '../utils/spokeCalculator';

const PDCScreen = ({ navigation, route }) => {
  const wheel = route.params?.wheel ?? {};

  const handleNext = ({ leftPcd, rightPcd }) => {
    const leftValidation = validatePcd(leftPcd, 'Left');
    if (!leftValidation.valid) throw new Error(leftValidation.message);

    const rightValidation = validatePcd(rightPcd, 'Right');
    if (!rightValidation.valid) throw new Error(rightValidation.message);

    if (leftValidation.value >= wheel.erd || rightValidation.value >= wheel.erd) {
      throw new Error('PCD must be smaller than ERD.');
    }

    navigation.navigate('WrWl', {
      wheel: {
        ...wheel,
        leftPcd: leftValidation.value,
        rightPcd: rightValidation.value,
      },
    });
  };

  return (
    <MeasurementScreen
      title="PCD"
      subtitle="Pitch Circle Diameter"
      imageSource={require('../assets/PDC.png')}
      fields={[
        { key: 'leftPcd', placeholder: 'PCD Left – Non-drive side (mm)' },
        { key: 'rightPcd', placeholder: 'PCD Right – Drive side (mm)' },
      ]}
      onNext={handleNext}
    />
  );
};

export default PDCScreen;
