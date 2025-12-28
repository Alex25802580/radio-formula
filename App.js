import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import HolesScreen from './screens/HolesScreen';
import ERDScreen from './screens/ERDScreen';
import PDCScreen from './screens/PDCScreen';
import WrWlScreen from './screens/WrWlScreen';
import CrucesScreen from "./screens/CrucesScreen";
import ResultadoScreen from "./screens/ResultadoScreen";
import SavedWheelsScreen from "./screens/RuedasGuardadas";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{ headerTitle: "" }}
          >
              <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
              <Stack.Screen name="Holes" component={HolesScreen} />
              <Stack.Screen name="ERD" component={ERDScreen} />
              <Stack.Screen name="PDC" component={PDCScreen} />
              <Stack.Screen name="WrWl" component={WrWlScreen} />
              <Stack.Screen name="Cruces" component={CrucesScreen} />
              <Stack.Screen name="Resultado" component={ResultadoScreen} />
              <Stack.Screen name="SavedWheels" component={SavedWheelsScreen} />
          </Stack.Navigator>
      </NavigationContainer>
  );
};
 