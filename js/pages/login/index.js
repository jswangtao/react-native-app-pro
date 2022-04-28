/*
 * @Author: wangtao
 * @Date: 2020-06-28 15:43:56
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-28 09:37:31
 * @Description: 登录
 */

import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { logo } from "@/images";
import { XMButton, XMImage, isAndroid, msg, XMSafeAreaView, XMInput, XMSendCodeButton, XMImageViewer } from "@/common";
import { px2dp, color_FFFFFF, color_000000 } from "@/styles";
import api from "@/api";

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
    const { visible } = this.state;
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

        <XMImageViewer
          sources={[
            {
              uri: logo
            }
          ]}
          visible={visible}
          onClose={() => {
            this.setState({ visible: false });
          }}
        />
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
