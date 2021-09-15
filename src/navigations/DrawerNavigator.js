import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import StackNavigator from './StackNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={({route, navigation}) => ({
        headerShown: false,
      })}>
      <Drawer.Screen name="Stack" component={StackNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
