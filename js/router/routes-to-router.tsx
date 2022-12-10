/*
 * @Author: wangtao
 * @Date: 2022-10-30 00:02:05
 * @LastEditors: wangtao
 * @LastEditTime: 2022-10-30 16:04:06
 * @Description: file content
 */
import React from "react";
import createNativeStackNavigator from "../navigators/createNativeStackNavigator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TRoutes } from "./types";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 栈路由
export const createStackRouter = (routes: TRoutes) => {
  return (
    <Stack.Navigator>
      {routes.map((route, key) => {
        return (
          <Stack.Screen key={key} name={route.name} options={route.options}>
            {props => {
              if (!React.isValidElement(route.component)) {
                return null;
              }
              return React.cloneElement(route.component, props);
            }}
          </Stack.Screen>
        );
      })}
    </Stack.Navigator>
  );
};

// Tab路由
export const createTabRouter = (routes: TRoutes) => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      {routes.map((route, key) => {
        return (
          <Tab.Screen name={route.name} key={key} options={route.options}>
            {props => {
              if (!React.isValidElement(route.component)) {
                return null;
              }
              return React.cloneElement(route.component, props);
            }}
          </Tab.Screen>
        );
      })}
    </Tab.Navigator>
  );
};
