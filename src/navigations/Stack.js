import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Login, Home, Detail, AxiosSample} from '../screens';
import {Colors} from '../assets/colors/Colors';

const Stack = createStackNavigator();

const StackNav = ({}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={({route, navigation}) => ({
          headerShown: false,
          ...TransitionPresets.SlideFromRightAndroid,
          cardStyle: {backgroundColor: Colors.backgroundGray},
        })}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="AxiosSample" component={AxiosSample} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNav;
