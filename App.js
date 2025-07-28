import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import CalculadoraScreen from './screens/CalculadoraScreen';
import ERDScreen from './screens/ERDScreen';
import PDCScreen from './screens/PDCScreen';
import WrWlScreen from './screens/WrWlScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Calculadora" component={CalculadoraScreen} />
              <Stack.Screen name="ERD" component={ERDScreen} />
              <Stack.Screen name="PDC" component={PDCScreen} />
              <Stack.Screen name="WrWl" component={WrWlScreen} />
          </Stack.Navigator>
      </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
