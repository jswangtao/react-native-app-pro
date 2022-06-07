/*
 * @Author: wangtao
 * @Date: 2020-06-28 15:43:56
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-06-07 15:08:10
 * @Description: 登录
 */

import React, { Component } from "react";
import { View, Text } from "react-native";
import { logo } from "@/images";
import { XMButton, XMImage, XMSafeAreaView, XMInput, XMSendCodeButton } from "@/common";
import { customerStyleSheet, color_FFFFFF, color_000000 } from "@/styles";
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

        <XMButton text="登录" type="primary" style={styles.btn} onClick={() => this.login()} />
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

const styles = customerStyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: color_FFFFFF
  },
  logoImg: {
    marginTop: 180
  },
  title: {
    fontSize: 44,
    fontWeight: "bold",
    color: color_000000,
    marginTop: 32
  },
  inputWrap: {
    width: 622,
    marginTop: 64
  },
  btn: {
    width: 638,
    height: 88,
    borderRadius: 44,
    marginTop: 80
  }
});
