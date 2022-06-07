/*
 * @Author: wangtao
 * @Date: 2020-09-08 16:51:16
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-05-26 14:04:37
 * @Description: file content
 */
import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { noop } from "../noop";

import { px2dp } from "../styles";

/**
 * 列表为空
 */
export default class XMEmpty extends React.PureComponent {
  static defaultProps = {
    image: require("./empty_default.png"),
    title: "",
    desc: "暂无数据~",
    style: {},
    imageStyle: {},
    renderFooter: noop
  };

  render() {
    const { image, desc, title, renderFooter, style, imageStyle } = this.props;
    return (
      <View style={[styles.emptyBox, style]}>
        <Image source={image} style={[styles.img, imageStyle]} resizeMode="contain" />
        {!!title && (
          <Text allowFontSacling={false} style={styles.titleTips}>
            {title}
          </Text>
        )}
        <Text allowFontSacling={false} style={styles.tips}>
          {desc}
        </Text>

        {renderFooter && renderFooter()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  emptyBox: {
    alignItems: "center",
    justifyContent: "center"
  },
  img: {
    width: px2dp(240),
    height: px2dp(240)
  },
  tips: {
    color: "#999896",
    fontSize: px2dp(28),
    marginTop: 10
  },
  titleTips: {
    color: "#343332",
    fontSize: px2dp(34),
    marginTop: 10,
    fontWeight: "bold"
  }
});
