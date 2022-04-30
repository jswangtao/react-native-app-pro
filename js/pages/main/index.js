/*
 * @Author: wangtao
 * @Date: 2020-06-28 15:43:56
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-30 14:45:37
 * @Description: 首页
 */

import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { logo } from "@/images";
import { msg, XMIcon, XMButton, AsyncStorage, cache } from "@/common";
import { color_2A64F4, color_CCCCCC } from "@/styles";
import api from "@/api";

import { observer, inject } from "mobx-react";
@inject("store")
@observer
class Main extends Component {
  static navigationOptions = () => ({
    title: "首页",
    tabBarIcon: ({ focused }) => <XMIcon name={"home"} size={24} color={focused ? color_2A64F4 : color_CCCCCC} />
  });

  constructor(props) {
    super(props);
    this.state = {
      userBaseInfo: {}
    };
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <Text>store中的user:{this.props.store.userStore.userBaseInfo.name}</Text>
        <Text>AsyncStorage中的user:{this.state.userBaseInfo.name}</Text>
        <XMButton
          text="get+"
          type="primary"
          onClick={() => {
            AsyncStorage.getItem(cache.USER_BASE_INFO).then(res => {
              this.setState({ userBaseInfo: res || {} });
            });
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
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    width: 220
  }
});
