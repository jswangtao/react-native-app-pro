/*
 * @Author: wangtao
 * @Date: 2020-06-28 15:43:56
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-29 11:30:22
 * @Description: 登录
 */

import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { logo } from "@/images";
import { XMButton, XMImage, isAndroid, msg, XMSafeAreaView, XMInput, XMSendCodeButton, XMImageViewer } from "@/common";
import { px2dp, color_FFFFFF, color_000000 } from "@/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "@/store/actions/user.actions";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      code: ""
    };
  }

  componentDidMount() {}

  render() {
    console.log("🚀🚀🚀wimi======>>>this.props", this.props);
    return (
      <XMSafeAreaView style={styles.container}>
        <XMImage width={100} height={100} source={logo} style={styles.logoImg} />
        <Text style={styles.title}>react-native-app-pro</Text>
        <View style={styles.inputWrap}>
          <XMInput
            border="bottom"
            placeholder="输入手机号"
            clearable
            onChangeText={text => {
              this.setState({ mobile: text });
            }}
            prefixIcon="phone"
            maxLength={11}
          />
          {/* <XMInput
            style={{ marginTop: 10 }}
            border="bottom"
            placeholder="输入密码"
            onChangeText={text => {
              console.log("🚀🚀🚀wimi======>>>text", text);
            }}
            prefixIcon="safe"
            type="password"
          /> */}

          <XMInput
            style={{ marginTop: 10 }}
            border="bottom"
            placeholder="输入验证码"
            onChangeText={text => {
              this.setState({ code: text });
            }}
            prefixIcon="safe"
            clearable
            maxLength={4}
            suffix={<XMSendCodeButton />}
          />
        </View>

        <XMButton
          text="登录"
          type="primary"
          style={{
            width: px2dp(638),
            height: px2dp(88),
            borderRadius: px2dp(44),
            marginTop: px2dp(80)
          }}
          onClick={() => this.login()}
        />
      </XMSafeAreaView>
    );
  }

  login = () => {
    const { mobile, code } = this.state;
    this.props.login_async({ mobile, code });
  };
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(userActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: color_FFFFFF
  },
  logoImg: {
    marginTop: px2dp(180)
  },
  title: {
    fontSize: px2dp(44),
    fontWeight: "bold",
    color: color_000000,
    marginTop: px2dp(32)
  },
  inputWrap: {
    width: px2dp(622),
    marginTop: px2dp(64)
  }
});
