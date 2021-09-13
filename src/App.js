import React from 'react';
import StackNavigator from './navigations/StackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
