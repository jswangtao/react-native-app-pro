/*
 * @Author: wangtao
 * @Date: 2020-06-28 15:43:56
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-05-26 13:37:34
 * @Description: 首页
 */

import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { empty01 } from "@/images";
import { msg, XMIcon, XMButton, XMListView, XMEmpty } from "@/common";
import { color_2A64F4, color_CCCCCC, px2dp, screenWidth } from "@/styles";
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
        <XMListView
          url="shop-api/api/v1/pi/getGoodsInfoApp"
          method="GET"
          params={{ gcCode: "stsp" }}
          dataPropsName={"data.goods"}
          renderRow={item => this._renderItem(item)}
        />
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
    justifyContent: "center"
  },
  wrap: {
    width: screenWidth
  }
});
