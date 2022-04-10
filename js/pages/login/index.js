/*
 * @Author: wangtao
 * @Date: 2020-06-28 15:43:56
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-10 17:48:03
 * @Description: 登录
 */

import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TextInput, PixelRatio, TouchableOpacity, ScrollView } from "react-native";
import { logo, iconLeftWhite } from "@/images";
import { Button, _, isAndroid, msg, XMSafeAreaView } from "@/common";
import { px2dp, mainBgColorWhite, fontColorBlack, fontColorLightGray, screenWidth } from "@/styles";
import api from "@/api";

const { SendButton, Submit } = Button;

export default class Login extends Component {
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
        <Image source={logo} resizeMode="contain" style={styles.logo} />
        <Text style={styles.title}>欢迎来到RN</Text>
        <TextInput
          style={[styles.textInput, { marginTop: px2dp(140) }]}
          ref={inputMobile => (this.inputMobile = inputMobile)}
          placeholder="手机号"
          placeholderTextColor="#999"
          maxLength={11}
          keyboardType="numeric"
          underlineColorAndroid="transparent"
          clearButtonMode="while-editing"
          onChangeText={text => {
            this.setState({
              mobile: text
            });
            if (text.length === 11) {
              this.inputMobile.blur();
            }
          }}
        />
        <View style={styles.pwdWrap}>
          <TextInput
            style={[styles.textInput]}
            placeholder="验证码"
            ref={inputCode => (this.inputCode = inputCode)}
            maxLength={4}
            keyboardType="number-pad"
            placeholderTextColor="rgba(153, 151, 150, 1)"
            underlineColorAndroid="transparent"
            onChangeText={text => {
              this.setState({
                code: text
              });
              if (text.length === 4) {
                this.inputCode.blur();
              }
            }}
          />
          <SendButton btnStyle={styles.sendBtn} onClick={() => {}} clickValid={() => {}} />
        </View>
        <Submit
          text="登录"
          boxStyle={{
            width: "100%",
            height: px2dp(88),
            borderRadius: px2dp(16),
            marginTop: px2dp(80)
          }}
          btnTextStyle={{ fontSize: px2dp(36) }}
          onClick={() => this.login()}
        />
        {/* 小返回按钮 */}
        <TouchableOpacity style={styles.backDot} onPress={() => msg.emit("router: back")}>
          <Image style={styles.backImg} resizeMode="stretch" source={iconLeftWhite} />
        </TouchableOpacity>
      </XMSafeAreaView>
    );
  }

  login = () => {
    const { mobile, code } = this.state;
    console.log("🚀🚀🚀wimi======>>>mobile,code", mobile, code);
    api.user.login({ mobile, code }).then(res => {
      if (res.success) {
        console.log("🚀🚀🚀wimi======>>>success", res);
      }
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: mainBgColorWhite,
    paddingHorizontal: px2dp(60)
  },
  logo: {
    width: px2dp(160),
    height: px2dp(180),
    ..._.ifIphoneX(
      { marginTop: px2dp(180 + 60) },
      isAndroid ? { marginTop: px2dp(180) } : { marginTop: px2dp(180 + 30) }
    )
  },
  title: {
    fontSize: px2dp(44),
    fontWeight: "bold",
    color: fontColorBlack,
    marginTop: px2dp(32)
  },
  textInput: {
    height: px2dp(80),
    width: "100%",
    textAlign: "left",
    fontSize: px2dp(32),
    borderBottomColor: fontColorLightGray,
    borderBottomWidth: 1 / PixelRatio.get()
  },
  pwdWrap: {
    width: "100%",
    position: "relative",
    marginTop: px2dp(20)
  },
  sendBtn: {
    position: "absolute",
    right: 0,
    height: px2dp(80)
  },
  backDot: {
    width: px2dp(66),
    height: px2dp(66),
    position: "absolute",
    left: px2dp(40),
    ..._.ifIphoneX({ top: px2dp(80 + 60) }, isAndroid ? { top: px2dp(80) } : { top: px2dp(80 + 30) }),
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: px2dp(33),
    justifyContent: "center",
    alignItems: "center"
  },
  backImg: {
    width: px2dp(36),
    height: px2dp(36)
  }
});
