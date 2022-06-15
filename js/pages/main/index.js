/*
 * @Author: wangtao
 * @Date: 2020-06-28 15:43:56
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-06-14 19:06:04
 * @Description: 首页
 */

import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import {} from "@/images";
import { msg, XMIcon, XMButton } from "@/common";
import { color_2A64F4, color_CCCCCC, screenWidth } from "@/styles";
import api from "@/api";

export default class Main extends Component {
  static navigationOptions = () => ({
    title: "首页",
    tabBarIcon: ({ focused }) => <XMIcon name={"home"} size={24} color={focused ? color_2A64F4 : color_CCCCCC} />
  });

  constructor(props) {
    super(props);
    this.state = {
      disabled: true
    };
  }
  componentDidMount() {}
  render() {
    return <View style={styles.container}>{this._renderView()}</View>;
  }

  _renderItem = item => {
    return (
      <View style={{ height: 100, backgroundColor: "pink", marginTop: 24 }}>
        <Text>{item.name}</Text>
      </View>
    );
  };

  _renderView = () => {
    return (
      <>
        <XMButton
          text="测试页面"
          onClick={() => {
            msg.emit("app:h5", {
              isVisible: true,
              url: "https://support.qq.com/product/411971",
              title: "test"
            });
          }}
        />
      </>
    );
  };

  test = () => {
    console.log("🚀🚀🚀wimi======>>>test");
    return new Promise(reslove => {
      setTimeout(() => {
        reslove(1);
      }, 3000);
    });
  };

  // 获取客服电话
  getCustomService = () => {
    const params = {
      code: "ydxlmkfdh"
    };
    api.user.getConfigValue(params).then(res => {
      console.log("🚀🚀🚀wimi======>>>res", res);
      if (res.success) {
        console.log("🚀🚀🚀wimi======>>>res", res);
      }
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "center"
  },
  wrap: {
    width: screenWidth
  }
});
