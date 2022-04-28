/*
 * @Author: wangtao
 * @Date: 2020-06-28 15:43:56
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-28 22:04:24
 * @Description: 登录弹框
 */

import React, { Component } from "react";
import { StyleSheet, View, Text, Modal, TouchableOpacity } from "react-native";
import { logo } from "@/images";
import { XMButton, XMImage, XMIcon, _, XMSafeAreaView, XMInput, XMSendCodeButton, msg } from "@/common";
import { px2dp, color_FFFFFF, color_000000, screenWidth, screenHeight } from "@/styles";
import api from "@/api";

export default class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      code: ""
    };
  }

  componentDidMount() {}

  render() {
    const { visible } = this.props;
    return (
      <Modal animationType="slide" transparent visible={visible}>
        <XMSafeAreaView style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              msg.emit("app:loginModal", false);
            }}
            style={{ position: "absolute", top: _.getStatusBarHeight() + 10, left: 20 }}
          >
            <XMIcon name={"close"} size={24} color={"#999"} />
          </TouchableOpacity>

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
          <Text style={styles.title}>react-native-app-pro2</Text>
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
        </XMSafeAreaView>
      </Modal>
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
    width: screenWidth,
    height: screenHeight,
    alignItems: "center",
    backgroundColor: color_FFFFFF,
    zIndex: 999
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
