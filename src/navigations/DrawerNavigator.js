import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import StackNavigator from './StackNavigator';
import {DrawerContents} from '../screens/DrawerContents';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContents {...props} />}
      screenOptions={({route, navigation}) => ({
        headerShown: false,
        drawerPosition: 'right',
      })}>
      <Drawer.Screen name="Stack" component={StackNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
