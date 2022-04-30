/*
 * @Author: wangtao
 * @Date: 2020-06-28 15:43:56
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-30 10:17:20
 * @Description: 首页
 */

import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { logo } from "@/images";
import { msg, XMIcon, AsyncStorage, cache, XMButton } from "@/common";
import { color_2A64F4, color_CCCCCC } from "@/styles";
import api from "@/api";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as basicActions from "@/store/actions/basic.actions";

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
    console.log("🚀🚀🚀wimi======>>>props", this.props);

    return (
      <View style={styles.container}>
        <Text>store中的user:{this.props.user.userBaseInfo.name}</Text>
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

const mapStateToProps = state => ({
  user: state.user
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
