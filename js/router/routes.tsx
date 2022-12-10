/*
 * @Author: wangtao
 * @Date: 2022-10-30 00:01:40
 * @LastEditors: wangtao
 * @LastEditTime: 2022-10-30 15:05:15
 * @Description: 路由配置
 */
import React from "react";
import { createTabRouter } from "./routes-to-router";
import { Icon } from "@/common";
import Main from "../pages/main";
import User from "../pages/user";
import About from "../pages/about";
// import { View, Text, Button } from "react-native";
import { TRoutes } from "./types";
import { color_2A64F4, color_CCCCCC } from "@/styles";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs/lib/typescript/src/types";

export const tabRoutes = [
  {
    name: "Main",
    component: <Main />,
    options: (): BottomTabNavigationOptions => ({
      tabBarIcon: ({ focused }) => {
        return <Icon name={"home1"} size={24} color={focused ? color_2A64F4 : color_CCCCCC} />;
      }
    })
  },
  {
    name: "User",
    component: <User />,
    options: (): BottomTabNavigationOptions => ({
      tabBarIcon: ({ focused }) => {
        return <Icon name={"home1"} size={24} color={focused ? color_2A64F4 : color_CCCCCC} />;
      }
    })
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

// function Test() {
//   return (
//     <View style={{ flex: 1, backgroundColor: "pink", alignItems: "center", justifyContent: "center" }}>
//       <Text>test</Text>
//       <Button
//         title="test"
//         onPress={() => {
//           console.log("🚀🚀🚀wimi======>>>1111");
//         }}
//       ></Button>
//     </View>
//   );
// }
