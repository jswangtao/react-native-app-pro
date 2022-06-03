/*
 * @Author: wangtao
 * @Date: 2020-06-28 15:43:56
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-06-03 10:11:24
 * @Description: 首页
 */

import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import {} from "@/images";
import { msg, XMIcon, XMButton, XMTabs } from "@/common";
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
    return (
      <View style={styles.container}>
        <XMTabs
          list={[
            { code: null, name: "全部" },
            { code: 1, name: "进行中" },
            { code: 2, name: "已完成" }
          ]}
        />
        {this._renderView()}
      </View>
    );
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
            // msg.emit("app:toast", { title: "message", icon: "success" });
            msg.emit("app:loginModal", true);
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
