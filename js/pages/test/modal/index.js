/*
 * @Author: wangtao
 * @Date: 2022-04-08 15:39:30
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-12 15:18:53
 * @Description: file content
 */
import React from "react";
import { View, StyleSheet, TouchableOpacity, Modal } from "react-native";
import {} from "@/common";
import { screenWidth, mainBgColorWhite, px2dp, screenHeight } from "@/styles";

export default class ReturnModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Modal animationType="slide" transparent visible onRequestClose={() => {}} onShow={() => {}}>
        <TouchableOpacity style={styles.mask} onPress={() => {}} />
        <View style={[styles.container]}>
          <View style={[styles.contentContainer]} />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  mask: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: "rgba(0,0,0,0.2)",
    position: "absolute",
    left: 0,
    top: 0
  },
  container: {
    width: screenWidth,
    height: screenHeight,
    position: "absolute",
    bottom: 0,
    left: 0,
    borderRadius: px2dp(12),
    overflow: "hidden",
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  contentContainer: {
    width: px2dp(640),
    height: px2dp(580),
    backgroundColor: mainBgColorWhite
  }
});
