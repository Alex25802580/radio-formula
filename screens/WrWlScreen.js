import React from 'react';
import MeasurementScreen from '../components/MeasurementScreen';
import { validateFlangeDistance } from '../utils/spokeCalculator';

const WrWlScreen = ({ navigation, route }) => {
  const wheel = route.params?.wheel ?? {};

  const handleNext = ({ leftFlangeDistance, rightFlangeDistance }) => {
    const leftValidation = validateFlangeDistance(leftFlangeDistance, 'Left');
    if (!leftValidation.valid) throw new Error(leftValidation.message);

    const rightValidation = validateFlangeDistance(rightFlangeDistance, 'Right');
    if (!rightValidation.valid) throw new Error(rightValidation.message);

    navigation.navigate('Crosses', {
      wheel: {
        ...wheel,
        leftFlangeDistance: leftValidation.value,
        rightFlangeDistance: rightValidation.value,
      },
    });
  };

  return (
    <MeasurementScreen
      title="WL / WR"
      subtitle="Hub center distance"
      imageSource={require('../assets/PDC.png')}
      fields={[
        {
          key: 'leftFlangeDistance',
          placeholder: 'WL – Non-drive side (mm)',
        },
        {
          key: 'rightFlangeDistance',
          placeholder: 'WR – Drive side (mm)',
        },
      ]}
      onNext={handleNext}
    />
  );
};

export default WrWlScreen;
