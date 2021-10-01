import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {
  Login,
  Home,
  Detail,
  AxiosSample,
  CheckOneByOne,
  List,
} from '../screens';
import {Colors} from '../assets/colors/Colors';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
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
          headerRight: () => (
            <Icon
              name="menu"
              size={35}
              onPress={() => navigation.openDrawer()}
            />
          ),
          // headerLeft: null,
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
          headerTitle: () => (
            <Header title={route.params.item.courses.courseName} />
          ),
          headerRight: () => (
            <Icon
              name="menu"
              size={35}
              onPress={() => navigation.openDrawer()}
            />
          ),
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
          headerRight: () => (
            <Icon
              name="menu"
              size={35}
              onPress={() => navigation.openDrawer()}
            />
          ),
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
          headerTitle: () => (
            <Header title={route.params.item.courses.courseName} />
          ),
          headerRight: () => (
            <Icon
              name="menu"
              size={35}
              onPress={() => navigation.openDrawer()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="List"
        component={List}
        options={({route, navigation}) => ({
          headerStyle: {
            backgroundColor: Colors.backgroundGray,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Header title={route.params.item.courses.courseName} />
          ),
          headerRight: () => (
            <Icon
              name="menu"
              size={35}
              onPress={() => navigation.openDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
