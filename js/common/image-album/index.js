/*
 * @Author: wangtao
 * @Date: 2022-04-28 09:41:31
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-28 19:37:22
 * @Description: 相册
 */
import React from "react";
import { View, Image, Animated, Easing, StyleSheet, Platform, TouchableOpacity, Text } from "react-native";
import { px2dp } from "../styles";
import XMImageViewer from "../image-viewer";
import XMImage from "../image";
const noop = () => {};
const loadingError = require("./loading_error.png");

export default class XMImageAlbum extends React.Component {
  static defaultProps = {
    sources: [], //源文件 // 1.没传sources  2.sources为[number]本地图片  3.sources为['']
    rowCount: 3 //每行展示图片数量
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { sources, rowCount } = this.props;
    const twoArr = this.group(sources, rowCount);
    return (
      <View style={[styles.container]}>
        {twoArr.map((arr, arrKey) => {
          return (
            <View style={styles.rowContainer} key={arrKey}>
              {arr.map((source, key) => {
                return <XMImage key={key} source={source} />;
              })}
            </View>
          );
        })}
      </View>
    );
  }

  group = (array, subGroupLength) => {
    let index = 0;
    let newArray = [];
    while (index < array.length) {
      newArray.push(array.slice(index, (index += subGroupLength)));
    }
    return newArray;
  };
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "pink"
  },
  rowContainer: {
    width: "100%",
    flexDirection: "row"
  }
});
