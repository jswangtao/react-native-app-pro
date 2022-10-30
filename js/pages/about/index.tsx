/*
 * @Author: wangtao
 * @Date: 2020-06-28 15:43:56
 * @LastEditors: wangtao
 * @LastEditTime: 2022-10-30 15:07:30
 * @Description: 关于
 */

import { msg } from "@/common";
import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <Button title="test" onPress={this.test}></Button>
      </View>
    );
  }

  test = () => {
    console.log("🚀🚀🚀wimi======>>>w222");
    // msg.emit("router: goToNext", {
    //   routeName: "Tab"
    // });
    msg.emit("router: backToTop");
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    justifyContent: "center"
  }
});
