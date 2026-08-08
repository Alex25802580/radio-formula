import React from 'react';
import MeasurementScreen from '../components/MeasurementScreen';
import { validateErd } from '../utils/spokeCalculator';

const ERDScreen = ({ navigation, route }) => {
  const wheel = route.params?.wheel ?? {};

  const handleNext = ({ erd }) => {
    const validation = validateErd(erd);
    if (!validation.valid) throw new Error(validation.message);

    navigation.navigate('Offset', {
      wheel: {
        ...wheel,
        erd: validation.value,
      },
    });
  };

  return (
    <MeasurementScreen
      title="ERD"
      subtitle="Effective Rim Diameter"
      imageSource={require('../assets/what-is-erd.png')}
      fields={[{ key: 'erd', placeholder: 'Enter ERD in mm' }]}
      onNext={handleNext}
    />
  );
};

export default ERDScreen;
