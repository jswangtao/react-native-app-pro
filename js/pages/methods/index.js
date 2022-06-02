/*
 * @Author: wangtao
 * @Date: 2020-06-28 15:43:56
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-06-02 18:24:54
 * @Description: ui
 */

import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { XMButton, msg } from "@/common";
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
        <ScrollView style={{ flex: 1 }}>
          {this._renderFloor(
            "toast",
            <>
              <XMButton
                text="Toast"
                type="primary"
                onClick={() => {
                  msg.emit("app:toast", { title: "message" });
                }}
                style={{ marginRight: 10 }}
              />
              <XMButton
                text="带icon"
                type="primary"
                onClick={() => {
                  msg.emit("app:toast", { title: "message", icon: "success" });
                }}
                style={{ marginRight: 10 }}
              />
              <XMButton
                text="需要主动关的toast"
                type="primary"
                onClick={() => {
                  msg.emit("app:toast", { title: "message", icon: "loading", duration: 0, mask: true });
                  setTimeout(() => {
                    msg.emit("app:hideToast");
                  }, 6000);
                }}
              />
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
    width: screenWidth
    // paddingHorizontal: 10
  },
  title: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: "bold"
  },
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    flexWrap: "wrap"
  },
  formContainer: {
    width: screenWidth
  }
});
