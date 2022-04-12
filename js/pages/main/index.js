/*
 * @Author: wangtao
 * @Date: 2020-06-28 15:43:56
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-12 23:42:45
 * @Description: 首页
 */

import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import {} from "@/images";
import { Button, msg, Icon } from "@/common";
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
        <Icon name={"icon_setting"} size={24} color={"#999"} />
        <Text>支持IconFont</Text>
        <Text>出现这个客服电话，说明mobx和接口都成功了：{this.props.store.basicStore.serviceNum}</Text>
        <LongButton
          text="goTo测试页面"
          boxStyle={{ marginTop: 20 }}
          onClick={() => {
            msg.emit("router: goToNext", { routeName: "Test" });
          }}
        />
      </View>
    );
  }
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
