/*
 * @Author: wangtao
 * @Date: 2020-06-28 15:43:56
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-06-10 15:28:48
 * @Description: 关于
 */

import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

import { observer, inject } from "mobx-react";
@inject("store")
@observer
class About extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <Text>this is About</Text>
        <Text>mobx测试:个人姓名 {this.props.store.userStore.userBaseInfo.name}</Text>
      </View>
    );
  }
}

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    justifyContent: "center"
  }
});
