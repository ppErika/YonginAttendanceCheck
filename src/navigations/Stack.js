import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Login, Home, Detail, AxiosSample, CheckOneByOne} from '../screens';
import {Colors} from '../assets/colors/Colors';
import Header from '../components/Header';

const Stack = createStackNavigator();

const StackNav = ({}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={({route, navigation}) => ({
          headerShown: true,
          ...TransitionPresets.SlideFromRightAndroid,
          cardStyle: {backgroundColor: Colors.backgroundGray},
        })}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={({route, navigation}) => ({
            headerStyle: {
              backgroundColor: Colors.backgroundGray,
              elevation: 0, // remove shadow on Android
              shadowOpacity: 0, // remove shadow on iOS
            },
            headerTitleAlign: 'center',
            headerTitle: () => <Header title="강의 목록" />,
            //headerLeft: null,
          })}
        />

        <Stack.Screen
          name="Detail"
          component={Detail}
          options={({route, navigation}) => ({
            headerStyle: {
              backgroundColor: Colors.backgroundGray,
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitleAlign: 'center',
            headerTitle: () => <Header title={route.params.item.name} />,
          })}
        />

        <Stack.Screen
          name="AxiosSample"
          component={AxiosSample}
          options={({route, navigation}) => ({
            headerStyle: {
              backgroundColor: Colors.backgroundGray,
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitleAlign: 'center',
            headerTitle: () => <Header title="api TEST" />,
            //headerLeft: null,
          })}
        />
        <Stack.Screen
          name="CheckOneByOne"
          component={CheckOneByOne}
          options={({route, navigation}) => ({
            headerStyle: {
              backgroundColor: Colors.backgroundGray,
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitleAlign: 'center',
            headerTitle: () => <Header title={route.params.lectureName} />,
            //headerLeft: null,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNav;
