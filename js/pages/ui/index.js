/*
 * @Author: wangtao
 * @Date: 2020-06-28 15:43:56
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-05-25 20:05:29
 * @Description: ui
 */

import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import {
  XMButton,
  XMImage,
  XMImageAlbum,
  XMIcon,
  XMHeader,
  XMSendCodeButton,
  XMInput,
  FormInput,
  FormSelect,
  FormItem
} from "@/common";
import { screenWidth, px2dp } from "@/styles";
import { logo } from "@/images";

export default class Ui extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <XMHeader title="自定义头部" />
        <ScrollView style={{ flex: 1 }}>
          {this._renderFloor(
            "图标",
            <>
              <XMIcon name={"phone"} size={24} color={"#999"} />
            </>
          )}
          {this._renderFloor(
            "按钮",
            <>
              <XMButton text="默认按钮" />
              <XMButton text="主要按钮" type="primary" />
              <XMButton text="空心按钮" type="success" plain />
              <XMButton text="文本按钮" type="danger" plain hairline={false} />
              <XMButton text="禁用按钮" type="warning" disabled style={{ marginTop: 6 }} />
            </>
          )}
          {this._renderFloor(
            "发送验证码",
            <>
              <XMSendCodeButton />
            </>
          )}
          {this._renderFloor(
            "图片浏览",
            <>
              <XMImage
                width={100}
                height={100}
                preview
                source={logo}
                style={styles.logoImg}
                onClick={source => {
                  console.log("🚀🚀🚀wimi======>>>source", source);
                }}
              />
            </>
          )}
          {this._renderFloor(
            "相册",
            <>
              <XMImageAlbum sources={[logo, logo, logo]} preview />
            </>
          )}
          {this._renderFloor(
            "输入框",
            <>
              <XMInput
                border="bottom"
                placeholder="输入手机号"
                clearable
                onChangeText={text => {
                  console.log("🚀🚀🚀wimi======>>>text", text);
                }}
                prefixIcon="phone"
              />
            </>
          )}
          {this._renderFloor(
            "输入框",
            <>
              <View style={styles.formContainer}>
                <FormSelect
                  label="客户名"
                  style={{ height: px2dp(104), paddingRight: px2dp(16) }}
                  selected={{ value: "" }}
                  onPress={() => {
                    console.log("🚀🚀🚀wimi======>>>1111");
                  }}
                />
                <FormInput label="车主类型" style={{ height: px2dp(104), paddingRight: px2dp(16) }} />
                <FormItem label="车主类型" style={{ height: px2dp(104), paddingRight: px2dp(16) }} placeholder="111" />
              </View>
            </>
          )}
        </ScrollView>
      </View>
    );
  }

  _renderFloor = (title, children) => {
    return (
      <View style={styles.floor}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.wrap}>{children}</View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f2f2f2"
  },
  floor: {
    width: screenWidth
    // paddingHorizontal: 10
  },
  title: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: "bold"
  },
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
    flexWrap: "wrap"
  },
  formContainer: {
    width: screenWidth
  }
});
