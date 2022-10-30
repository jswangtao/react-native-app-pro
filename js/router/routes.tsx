/*
 * @Author: wangtao
 * @Date: 2022-10-30 00:01:40
 * @LastEditors: wangtao
 * @LastEditTime: 2022-10-30 15:05:15
 * @Description: 路由配置
 */
import React, { ReactElement } from "react";
import { createStackRouter, createTabRouter } from "./routes-to-router";
import Main from "../pages/main";
import User from "../pages/user";
import About from "../pages/about";
import { View, Text, Button } from "react-native";
import { TRoutes } from "./types";

export const tabRoutes = [
  {
    name: "Main",
    component: <Main />
  },
  {
    name: "User",
    component: <User />
  }
];

// 栈路由
export const stackRoutes: TRoutes = [
  {
    name: "Tab",
    component: createTabRouter(tabRoutes),
    options: { headerShown: false }
  },
  {
    name: "About",
    component: <About />
  }
];

function Test() {
  return (
    <View style={{ flex: 1, backgroundColor: "pink", alignItems: "center", justifyContent: "center" }}>
      <Text>test</Text>
      <Button
        title="test"
        onPress={() => {
          console.log("🚀🚀🚀wimi======>>>1111");
        }}
      ></Button>
    </View>
  );
}
