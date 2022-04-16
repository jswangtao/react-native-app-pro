/*
 * @Author: wangtao
 * @Date: 2020-06-28 15:43:56
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-16 17:09:36
 * @Description: 首页
 */

import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import {} from "@/images";
import { msg, Icon, XMButton } from "@/common";
import { color_2A64F4, color_CCCCCC } from "@/styles";
import api from "@/api";

const { LongButton } = Button;
import { observer, inject } from "mobx-react";
@inject("store")
@observer
class Main extends Component {
  static navigationOptions = () => ({
    title: "首页",
    tabBarIcon: ({ focused }) => <Icon name={"home1"} size={24} color={focused ? color_2A64F4 : color_CCCCCC} />
  });

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <XMButton text="默认按钮" type="primary" icon="icon_setting" onClick={this.test} />
        <Icon name={"icon_setting"} size={24} color={"#999"}>
          支持IconFont
        </Icon>
      </View>
    );
  }

  test = () => {
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
export default Main;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    justifyContent: "center"
  }
});
