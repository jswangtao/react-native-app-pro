/*
 * @Author: wangtao
 * @Date: 2020-06-28 15:43:56
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-28 22:03:23
 * @Description: 首页
 */

import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { logo } from "@/images";
import { msg, XMIcon, XMButton, XMImageAlbum } from "@/common";
import { color_2A64F4, color_CCCCCC } from "@/styles";
import api from "@/api";

export default class Main extends Component {
  static navigationOptions = () => ({
    title: "首页",
    tabBarIcon: ({ focused }) => <XMIcon name={"home"} size={24} color={focused ? color_2A64F4 : color_CCCCCC} />
  });

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // this.getCustomService();
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderView()}
        {/* <XMIcon name={"icon_setting"} size={24} color={"#999"}>
          支持IconFont
        </XMIcon> */}
      </View>
    );
  }

  _renderView = () => {
    return (
      <>
        <XMButton
          text="公共组件"
          type="primary"
          style={{ marginBottom: 10 }}
          onClick={() => {
            msg.emit("router:goToNext", {
              routeName: "Ui"
            });
          }}
        />
        <XMButton
          text="测试页面"
          onClick={() => {
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
      }
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    width: 220
  }
});
