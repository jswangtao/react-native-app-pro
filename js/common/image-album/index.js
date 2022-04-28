/*
 * @Author: wangtao
 * @Date: 2022-04-28 09:41:31
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-28 20:48:52
 * @Description: 相册
 */
import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import XMImageViewer from "../image-viewer";
import XMImage from "../image";

export default class XMImageAlbum extends React.Component {
  static defaultProps = {
    sources: [], //源文件 // 1.没传sources  2.sources为[number]本地图片  3.sources为['']
    rowCount: 3, //每行展示图片数量
    maxCount: 9, //最多展示的图片数量，超出时最后一个位置将会显示剩余图片数量
    preview: false //是否可以预览图片
  };

  constructor(props) {
    super(props);
    this.state = {
      width: null,
      isVisible: false
    };
  }

  render() {
    const { sources, rowCount, maxCount } = this.props;
    const { width } = this.state;
    const twoArr = this.group(sources, rowCount);
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          this.setState({ isVisible: true });
        }}
      >
        {twoArr.map((arr, arrKey) => {
          return (
            <View
              style={styles.rowContainer}
              key={arrKey}
              onLayout={event => {
                this.setState({ width: event.nativeEvent.layout.width / rowCount });
              }}
            >
              {arr.map((source, index) => {
                return (
                  <View key={index}>
                    <XMImage
                      source={source}
                      width={width}
                      height={width}
                      onClick={() => {
                        this.setState({ isVisible: true });
                      }}
                    />
                    {twoArr.length - 1 === arrKey && arr.length - 1 === index && (
                      <View style={[styles.mask]}>
                        <Text style={styles.maskTxt}>+{sources.length - maxCount}</Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          );
        })}
        {this._renderPreView()}
      </TouchableOpacity>
    );
  }

  // 预览界面
  _renderPreView = () => {
    let { sources, preview } = this.props;
    let { isVisible } = this.state;
    return preview ? (
      <XMImageViewer
        sources={sources}
        visible={isVisible}
        onClose={() => {
          this.setState({ isVisible: false });
        }}
      />
    ) : null;
  };

  group = (array, subGroupLength) => {
    const { maxCount } = this.props;
    let index = 0;
    let arrayView = array.slice(0, maxCount);

    let newArray = [];
    while (index < arrayView.length) {
      newArray.push(arrayView.slice(index, (index += subGroupLength)));
    }
    return newArray;
  };
}

const styles = StyleSheet.create({
  container: {
    width: "100%"
  },
  rowContainer: {
    width: "100%",
    flexDirection: "row"
  },
  mask: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center"
  },
  maskTxt: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  }
});
