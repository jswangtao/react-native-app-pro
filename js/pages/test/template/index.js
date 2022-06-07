/*
 * @Author: wangtao
 * @Date: 2020-06-28 15:43:56
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-06-03 09:26:14
 * @Description: 登录
 */

import React, { Component } from "react";
import { View, Text } from "react-native";
import { logo } from "@/images";
import { XMButton, XMImage, XMSafeAreaView, XMInput, XMSendCodeButton } from "@/common";
import { customerStyleSheet, color_FFFFFF, color_000000 } from "@/styles";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      code: "",
      visible: false
    };
  }

  componentDidMount() {}

  render() {
    return (
      <XMSafeAreaView style={styles.container}>
        <XMImage
          width={100}
          height={100}
          preview
          source={logo}
          // source={
          //   "https://cdn.jsdelivr.net/gh/WTxiaomage/imgsbed/posts/1535725078-1224-20160201162405944-676557632.jpg"
          // }
          style={styles.logoImg}
          onClick={source => {
            console.log("🚀🚀🚀wimi======>>>source", source);
          }}
        />
        <Text style={styles.title}>react-native-app-pro</Text>
        <View style={styles.inputWrap}>
          <XMInput
            border="bottom"
            placeholder="输入手机号"
            clearable
            onChangeText={text => {
              console.log("🚀🚀🚀wimi======>>>text", text);
            }}
            prefixIcon="phone"
          />
          <XMInput
            style={{ marginTop: 10 }}
            border="bottom"
            placeholder="输入密码"
            onChangeText={text => {
              console.log("🚀🚀🚀wimi======>>>text", text);
            }}
            prefixIcon="safe"
            type="password"
          />

          <XMInput
            style={{ marginTop: 10 }}
            border="bottom"
            placeholder="输入验证码"
            onChangeText={text => {
              console.log("🚀🚀🚀wimi======>>>text", text);
            }}
            prefixIcon="safe"
            clearable
            suffix={<XMSendCodeButton />}
          />
        </View>

        <XMButton text="登录" type="primary" style={styles.btn} onClick={() => this.login()} />
      </XMSafeAreaView>
    );
  }

  login = () => {
    this.setState({ visible: true });
    // const { mobile, code } = this.state;
    // console.log("🚀🚀🚀wimi======>>>mobile,code", mobile, code);
    // api.user.login({ mobile, code }).then(res => {
    //   if (res.success) {
    //     console.log("🚀🚀🚀wimi======>>>success", res);
    //   }
    // });
  };
}

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
