/*
 * @Author: wangtao
 * @Date: 2020-06-28 15:43:56
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-02-19 20:28:44
 * @Description: 关于
 */

import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";
import { AsyncStorage, cache, XMButton } from "@/common";
import { bindActionCreators } from "redux";
import * as basicActions from "@/store/actions/basic.actions";
class About extends Component {
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

export default connect(mapStateToProps, mapDispatchToProps)(About);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    justifyContent: "center"
  }
});
