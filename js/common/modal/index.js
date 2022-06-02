/*
 * @Author: wangtao
 * @Date: 2020-06-29 11:01:03
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-06-02 20:00:13
 * @Description: Overlay
 */
/**
 * overlay
 * @type {ReactNative|exports|module.exports}
 */
import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import { screenHeight } from "../styles";

export default class Overlay extends PureComponent {
  static defaultProps = {
    modal: false // 是不是需要模态
  };

  render() {
    if (this.props.modal) {
      return <View style={[styles.modalContainer, this.props.style]}>{this.props.children}</View>;
    }
    return (
      <View style={[styles.tipContainer, { bottom: screenHeight / 2 }]}>
        <View style={styles.container}>{this.props.children}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // 模态
  modalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)"
  },

  // 普通的overlay
  container: {
    flexWrap: "wrap",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 6,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center"
  },

  tipContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  }
});
