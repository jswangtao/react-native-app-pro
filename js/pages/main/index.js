/*
 * @Author: wangtao
 * @Date: 2020-06-28 15:43:56
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-29 06:29:04
 * @Description: 首页
 */

import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { logo } from "@/images";
import { msg, XMIcon, XMButton, XMImageAlbum } from "@/common";
import { color_2A64F4, color_CCCCCC } from "@/styles";
import api from "@/api";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as basicActions from "../../store/actions/basic.actions";

class Main extends Component {
  static navigationOptions = () => ({
    title: "首页",
    tabBarIcon: ({ focused }) => <XMIcon name={"home"} size={24} color={focused ? color_2A64F4 : color_CCCCCC} />
  });

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // this.getCustomService();
  }

  render() {
    console.log("🚀🚀🚀wimi======>>>props", this.props);
    return (
      <View style={styles.container}>
        <XMButton text="async+" type="primary" onClick={this.increment_async} />
        <XMIcon name={"add"} size={24} color={"#999"}>
          {this.props.basic.count}
        </XMIcon>
        <XMButton text="+" type="primary" onClick={this.increment} />
      </View>
    );
  }

  increment_async = () => {
    this.props.increment_async(20);
  };
  increment = () => {
    this.props.increment(1);
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

const mapStateToProps = state => ({
  basic: state.basic
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(basicActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    width: 220
  }
});
