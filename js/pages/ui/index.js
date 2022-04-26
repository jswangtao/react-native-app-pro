/*
 * @Author: wangtao
 * @Date: 2020-06-28 15:43:56
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-26 22:10:49
 * @Description: ui
 */

import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { XMButton, msg, AsyncStorage, cache, XMHeader, XMSendCodeButton } from "@/common";
import { screenWidth } from "@/styles";

export default class Ui extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <XMHeader title="自定义头部" />
        <ScrollView style={{ flex: 1 }}>
          {this._renderFloor(
            "按钮",
            <>
              <XMButton text="默认按钮" />
              <XMButton text="主要按钮" type="primary" />
              <XMButton text="空心按钮" type="success" plain />
              <XMButton text="文本按钮" type="danger" plain hairline={false} />
              <XMButton text="禁用按钮" type="warning" disabled style={{ marginTop: 6 }} />
            </>
          )}
          {this._renderFloor(
            "发送验证码",
            <>
              <XMSendCodeButton />
            </>
          )}
        </ScrollView>
      </View>
    );
  }

  _renderFloor = (title, children) => {
    return (
      <View style={styles.floor}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.wrap}>{children}</View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f2f2f2"
  },
  floor: {
    width: screenWidth,
    paddingHorizontal: 10
  },
  title: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: "bold"
  },
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
    flexWrap: "wrap"
  }
});
