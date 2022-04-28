/*
 * @Author: wangtao
 * @Date: 2020-06-28 15:43:56
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-26 21:00:34
 * @Description: 个人中心
 */

import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { XMButton, msg, AsyncStorage, cache, XMHeader, XMSendCodeButton } from "@/common";
import userApi from "@/api/user";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <XMHeader title="测试页面" />
        <XMSendCodeButton />
      </View>
    );
  }

  // 测试同步存储和异步存储
  testStorage = () => {
    AsyncStorage.getItem(cache.USER).then(res => {
      console.log("🚀🚀🚀wimi======>>>AsyncStorage", res);
    });
  };

  // 测试cookie是否丢失（iOS需要特殊处理）
  testCookie = () => {
    // 登录成功获取用户信息
    userApi
      .getUserInfo()
      .then(response => {
        if (response.success) {
          console.log("🚀🚀🚀wimi======>>>success", response);
        } else {
          console.log("🚀🚀🚀wimi======>>>error", response);
          msg.emit("router:goToNext", { routeName: "Login" });
          // NativeModules.WindowModule.showWindow({ content: response.msg, onlyRightBtn: '1' }, (e) => { });
        }
      })
      .catch(error => {
        console.log("🚀🚀🚀wimi======>>>error", error);
        // NativeModules.WindowModule.showWindow({ content: '登录用户信息异常，请重新登录', onlyRightBtn: '1' }, (e) => { });
      });
  };

  // 测试全局tips弹框
  testTip = () => {
    msg.emit("app:tip", { text: "message" });
    // msg.emit('app:tip', { text: '删除成功', icon: 'success' });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f2f2f2"
  }
});
