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

export const AppContainer = React.forwardRef((props, ref: any) => {
  return <NavigationContainer ref={ref}>{createStackRouter(stackRoutes)}</NavigationContainer>;
});

AppContainer.displayName = "AppContainer";
