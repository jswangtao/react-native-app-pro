/*
 * @Author: wangtao
 * @Date: 2022-04-10 02:28:23
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-10 15:25:16
 * @Description: file content
 */
import * as React from 'react';
import {Text, Pressable, View, StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import {
  NavigationContainer,
  useNavigationBuilder,
  createNavigatorFactory,
  TabRouter,
  TabActions,
  NavigationHelpersContext,
} from '@react-navigation/native';
import {StackRouter} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import Main from './pages/main';
import User from './pages/user';
import Setting from './pages/setting';
import Details from './pages/details';

function MyStackRouter(options) {
  const router = StackRouter(options);
  return {
    ...router,
    getStateForAction(state, action, options) {
      if (__DEV__) {
        console.log('wangtao:action----->', action);
        console.log('wangtao:state----->', state);
      }
      const defaultGetStateForAction = router.getStateForAction;

      // let routes = [];
      // routes.push({
      //   name: 'Setting',
      //   key: Math.random().toString(),
      // });
      // return {
      //   ...state,
      //   routes,
      //   index: routes.length - 1,
      // };

      return defaultGetStateForAction(state, action, options);
    },
  };
}

function MyStackNavigator({initialRouteName, children, screenOptions}) {
  const {state, navigation, descriptors, NavigationContent} =
    useNavigationBuilder(MyStackRouter, {
      children,
      screenOptions,
      initialRouteName,
    });
  return (
    <NavigationHelpersContext.Provider value={navigation}>
      <View style={{flex: 1}}>
        {descriptors[state.routes[state.index].key].render()}
      </View>
    </NavigationHelpersContext.Provider>
  );
}
const createMyStackNavigator = createNavigatorFactory(MyStackNavigator);

const My = createMyStackNavigator();
export default function AppContainer() {
  return (
    <NavigationContainer>
      <My.Navigator
        backBehavior="history"
        screenOptions={{
          headerShown: true,
          cardOverlayEnabled: false,
          cardShadowEnabled: false,
          cardStyle: {borderWidth: 0},
        }}>
        <My.Screen name="MainTab" component={MainTab} />
        <My.Screen
          name="Details"
          component={Details}
          options={{title: 'Details'}}
        />
        <My.Screen name="Setting" component={Setting} />
      </My.Navigator>
    </NavigationContainer>
  );
}

function MainTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Main" component={Main} />
      <Tab.Screen name="User" component={User} />
    </Tab.Navigator>
  );
}
