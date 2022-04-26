/*
 * @Author: wangtao
 * @Date: 2020-06-28 15:43:56
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-27 00:29:36
 * @Description: 登录
 */

import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TextInput, PixelRatio, TouchableOpacity, ScrollView } from "react-native";
import { logo, iconLeftWhite } from "@/images";
import { XMButton, _, isAndroid, msg, XMSafeAreaView, XMInput } from "@/common";
import { px2dp, color_FFFFFF, fontColorBlack, fontColorLightGray, screenWidth } from "@/styles";
import api from "@/api";

// const { SendButton, Submit } = Button;

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
        <Text style={styles.title}>react-native-app-pro</Text>
        <View style={styles.inputWrap}>
          <XMInput />
        </View>

        {/* <TextInput
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
        /> */}
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
    backgroundColor: color_FFFFFF
  },
  logo: {
    width: px2dp(160),
    height: px2dp(180),
    marginTop: px2dp(180)
  },
  title: {
    fontSize: px2dp(44),
    fontWeight: "bold",
    color: fontColorBlack,
    marginTop: px2dp(32)
  },
  inputWrap: {
    width: px2dp(622),
    marginTop: px2dp(64)
  }
});
