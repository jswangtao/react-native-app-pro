/*
 * @Author: wangtao
 * @Date: 2020-07-11 15:43:52
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-26 21:28:47
 * @Description: 路由管理文件
 */
import React from "react";
import { Platform, PixelRatio, StatusBar } from "react-native";
import { createAppContainer, NavigationActions } from "react-navigation";
import { createStackNavigator, TransitionSpecs, CardStyleInterpolators } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { BackImageOn, _ } from "@/common";
import { px2dp } from "@/styles";
import Main from "./pages/main";
import User from "./pages/user";
import About from "./pages/about";
import Login from "./pages/login";
import Ui from "./pages/ui";
// 测试页面start
import Test from "./pages/test";
import ListViewDemo from "./pages/test/listview";

// 测试页面end

const isAndroid = Platform.OS === "android";

// header为空的属性
const emptyHeader = {
  header: null,
  navigationOptions: {
    headerShown: false,
    headerBackTitle: null
  }
};
// 标题局中
const titleCenter = {
  headerTitleStyle: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    height: px2dp(88),
    lineHeight: px2dp(88),
    flex: 1,
    paddingRight: isAndroid ? 56 : 0,
    fontSize: 18
  }
};

// 适用于ios和安卓两个平台的底部导航栏
const TabNavigator = createBottomTabNavigator(
  {
    // 首页
    Main: {
      screen: Main
    },
    User: {
      screen: User
    }
  },
  {
    initialRouteName: "Main",
    tabBarOptions: {
      labelStyle: {
        fontSize: 12
      },
      allowFontScaling: false,
      activeBackgroundColor: "#fff",
      inactiveBackgroundColor: "#fff",
      activeTintColor: "#2A64F4",
      style: {
        borderTopWidth: 1 / PixelRatio.get(),
        borderTopColor: "#F0EFEF"
      }
    },
    lazy: true,
    animationEnabled: false,
    swipeEnabled: false
  }
);
// 路由页面
// 在新的页面被放入栈顶之后，StackNavigator 给你的应用程序提供了切换页面的方法。
// 在 iOS 与 Android 平台上，StackNavigator 默认对应着它们各自的风格，
// 比如在 iOS 上新的页面从右侧滑入，而在 Android 上则是从底部淡入。
const AppNavigator = createStackNavigator(
  {
    // 首页tab页面
    Tab: {
      screen: TabNavigator,
      navigationOptions: {
        headerShown: false,
        headerBackTitle: null
      }
    },
    Login: {
      screen: Login,
      ...emptyHeader
    },

    About: {
      screen: About,
      navigationOptions: {
        headerTitle: "个人资料",
        ...titleCenter
      }
    },
    Test: {
      screen: Test,
      ...emptyHeader
    },
    ListViewDemo: {
      screen: ListViewDemo,
      navigationOptions: {
        headerTitle: "列表",
        ...titleCenter
      }
    },
    Ui: {
      screen: Ui,
      ...emptyHeader
    }
  },
  {
    // initialRouteName:__DEV__ ? 'Test' : 'BootPage',
    initialRouteName: "Tab",
    mode: "card",
    // // screen：每个页面都有各自的标题栏，并且伴随着页面切换一起淡入淡出。这是 Android 上的常见模式。
    headerMode: "screen",
    defaultNavigationOptions: {
      // 这段代码有点绕，主要是为了保持Android和iOS以及自定义头部的一致性
      headerStyle: isAndroid
        ? {
            elevation: 0,
            borderBottomWidth: 2 / PixelRatio.get(),
            borderBottomColor: "#F0EFEF",
            height: px2dp(88) + StatusBar.currentHeight
          }
        : Object.assign(
            {
              elevation: 0,
              borderBottomWidth: 2 / PixelRatio.get(),
              borderBottomColor: "#F0EFEF"
            },
            _.getStatusBarHeight() ? { height: px2dp(88) + _.getStatusBarHeight() } : {}
          ),
      headerTintColor: "#000",
      headerLeft: () => <BackImageOn />,
      headerBackTitle: null,
      // 将安卓的跳转动画改成iOS
      transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec
      },
      // 只要修改最后的forHorizontalIOS就可以实现不同的动画了。
      // 从右向左：forHorizontalIOS
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    }
  }
);

export const AppContainer = createAppContainer(AppNavigator);

const defaultGetStateForAction = AppNavigator.router.getStateForAction;

AppNavigator.router.getStateForAction = (action, state) => {
  if (__DEV__) {
    console.log("wangtao:action----->", action);
    console.log("wangtao:state----->", state);
  }

  if (state && action.type === "replace") {
    // 替换当前路由,如果当前路由存在栈中,则删除栈中存在的路由
    let routes = [];
    const index = action.index || 1;
    if (state.routes.length > 1) {
      routes = state.routes.filter(r => r.routeName !== action.routeName);
      routes = routes.slice(0, routes.length - index);
      const { routeName, ...other } = action;
      const route = {
        routeName,
        params: other,
        key: Math.random().toString()
      };
      routes.push(route);
      return {
        ...state,
        routes,
        index: routes.length - 1
      };
    }
    return defaultGetStateForAction(NavigationActions.init());
  }
  if (state && action.type === "refresh") {
    // 刷新当前页面
    const { routes } = state;
    routes[state.routes.length - 1].key = Math.random().toString();
    return {
      ...state,
      routes,
      index: routes.length - 1
    };
  }
  if (state && action.type === "backToTop") {
    // 返回首页
    if (state.routes.length <= 1 || state.routes[0].routeName === "Login") {
      return defaultGetStateForAction(NavigationActions.init());
    }
    const routes = state.routes.slice(0, 1);
    state.routes = routes;
    routes[0].key = Math.random().toString();
    routes[0].index = 0;
    if (routes[0].routes && routes[0].routes.length > 0) {
      routes[0].routes[0].params = action.params;
    }
    return {
      ...state,
      routes,
      index: routes.length - 1
    };
  }
  if (state && action.type === "refreshRoute") {
    // 刷新栈中指定名称路由,如果不存在,则不进行任何操作
    const { routes } = state;
    const index = routes.findIndex(r => r.routeName === action.routeName);
    if (index >= 0) {
      routes[index].key = Math.random().toString();
    }
    return {
      ...state,
      routes,
      index: routes.length - 1
    };
  }
  if (state && action.type === "refreshRoutes") {
    // 刷新栈中指定名称路由,如果不存在,则不进行任何操作
    const names = action.routeNames;
    const routes = state.routes.map(r => {
      if (names.some(n => n === r.routeName)) {
        r.key = Math.random().toString();
      }
      return r;
    });
    return {
      ...state,
      routes,
      index: routes.length - 1
    };
  }

  return defaultGetStateForAction(action, state);
};
