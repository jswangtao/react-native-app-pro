/*
 * @Author: wangtao
 * @Date: 2021-08-16 14:36:01
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-06-07 15:07:25
 * @Description: file content
 */
import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Modal, ActivityIndicator, Text, Image } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { px2dp, isAndroid, screenWidth } from "../../styles";
import * as _ from "../util";
const noop = () => {};
export default class XMImageViewer extends Component {
  static defaultProps = {
    index: 0, // 初始显示第几张图片
    visible: false,
    closeIcon: false,
    closeText: "",
    sources: [], //源文件 // 1.没传sources  2.sources为[number]本地图片  3.sources为['']
    onClose: noop
  };
  // 1.没传sources  2.sources为[number]本地图片  3.sources为['']
  render() {
    let { index, visible, sources, ...rest } = this.props;
    let imageUrls = [];
    if (sources) {
      imageUrls = sources.map(item => {
        // 插件需要的数据格式
        let itemResult = {
          url: "",
          props: {
            source: ""
          }
        };
        // 判断是否是网络图片
        if (String.prototype.indexOf.call(item, "http") !== -1) {
          itemResult.url = item;
        } else {
          // 本地图片
          itemResult.url = "";
          itemResult.props.source = item;
        }
        return itemResult;
      });
    }
    return (
      <Modal visible={visible} transparent>
        <ImageViewer
          index={index}
          loadingRender={this._renderLoad}
          renderIndicator={this._renderIndicator}
          onClick={this._onClose}
          imageUrls={imageUrls}
          {...rest}
          // 属性放在rest参数后面，外部复写将失效，可视为禁用外部自定义
          saveToLocalByLongPress={false}
        />
      </Modal>
    );
  }

  _renderIndicator = (currentIndex, allSize) => {
    const { closeIcon, closeText } = this.props;
    return (
      <View style={styles.indicatorWrap}>
        <TouchableOpacity activeOpacity={0.8} style={styles.closeBtn} onPress={this._onClose}>
          {closeIcon ? (
            <Image style={styles.iconCloseImg} source={require("./icon_close_white.png")} />
          ) : (
            <Text style={styles.closeText}>{closeText || "关闭"}</Text>
          )}
        </TouchableOpacity>
        {allSize > 1 && (
          <Text style={styles.indicatorLabel}>
            {currentIndex}/{allSize}
          </Text>
        )}
      </View>
    );
  };

  _renderLoad = () => {
    return (
      <View style={{}}>
        <ActivityIndicator size="small" />
      </View>
    );
  };

  _onClose = () => {
    const { onClose } = this.props;
    onClose();
  };
}

const styles = StyleSheet.create({
  iconCloseImg: {
    width: px2dp(30),
    height: px2dp(30)
  },
  closeBtn: {
    width: px2dp(88),
    height: px2dp(88),
    position: "absolute",
    ..._.ifIphoneX({ top: px2dp(0) }, isAndroid ? { top: px2dp(0) } : { top: px2dp(10) }),
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3000
  },
  closeText: {
    fontSize: px2dp(28),
    color: "#FFFFFF"
  },
  indicatorWrap: {
    position: "absolute",
    ..._.ifIphoneX({ top: px2dp(80) }, isAndroid ? { top: px2dp(0) } : { top: px2dp(10) }),
    width: screenWidth,
    height: px2dp(80),
    justifyContent: "center",
    alignItems: "center"
  },
  indicatorLabel: {
    color: "#FFFFFF",
    fontSize: px2dp(32)
  }
});
