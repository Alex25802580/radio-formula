import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import HolesScreen from './screens/HolesScreen';
import ERDScreen from './screens/ERDScreen';
import OffsetScreen from './screens/OffsetScreen';
import PDCScreen from './screens/PDCScreen';
import WrWlScreen from './screens/WrWlScreen';
import CrossesScreen from './screens/CrucesScreen';
import ResultScreen from './screens/ResultScreen';
import SavedWheelsScreen from './screens/SavedWheelsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitle: '',
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Holes" component={HolesScreen} />
        <Stack.Screen name="ERD" component={ERDScreen} />
        <Stack.Screen name="Offset" component={OffsetScreen} />
        <Stack.Screen name="PDC" component={PDCScreen} />
        <Stack.Screen name="WrWl" component={WrWlScreen} />
        <Stack.Screen name="Crosses" component={CrossesScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="SavedWheels" component={SavedWheelsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
