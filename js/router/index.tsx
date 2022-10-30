/*
 * @Author: wangtao
 * @Date: 2022-10-30 00:01:27
 * @LastEditors: wangtao
 * @LastEditTime: 2022-10-30 16:48:58
 * @Description: file content
 */
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackRouter } from "./routes-to-router";
import { stackRoutes } from "./routes";
import { StackRouter } from "@react-navigation/native";

const linking = {
  prefixes: ["https://mychat.com", "mychat://"],
  config: {
    screens: {
      Chat: "feed/:sort"
    }
  },
  getStateFromPath: (path, options) => {
    console.log("🚀🚀🚀wimi======>>>path, options", path, options);
    // Return a state object here
    // You can also reuse the default logic by importing `getStateFromPath` from `@react-navigation/native`
  },
  getPathFromState(state, config) {
    console.log("🚀🚀🚀wimi======>>>state, config", state, config);
    // Return a path string here
    // You can also reuse the default logic by importing `getPathFromState` from `@react-navigation/native`
  }
};

export const AppContainer = React.forwardRef((props, ref: any) => {
  console.log("🚀🚀🚀wimi======>>>StackRouter", StackRouter);
  return (
    <NavigationContainer ref={ref} linking={linking}>
      {createStackRouter(stackRoutes)}
    </NavigationContainer>
  );
});

AppContainer.displayName = "AppContainer";
