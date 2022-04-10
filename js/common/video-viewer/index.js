/*
 * @Author: wangtao
 * @Date: 2021-10-27 15:57:31
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-01-26 11:03:41
 * @Description: file content
 */
import React, { PureComponent } from "react";
import { View, Text, StyleSheet, PixelRatio, TouchableOpacity, Image, Modal } from "react-native";
import Video from "react-native-video";
import { screenWidth, screenHeight, px2dp, isAndroid } from "../styles";
import * as _ from "../util";
import { noop } from "../noop";

export default class VideoViewer extends PureComponent {
  static defaultProps = {
    // url: 'http://apicbs.dev.guojutech.net/filereso-api/oss/file/viewFile?fileId=A6646E6309444A9CB1B3994AB4AAE0FE',
    // url: 'https://www.runoob.com/try/demo_source/mov_bbb.mp4',
    source: { uri: "https://www.runoob.com/try/demo_source/mov_bbb.mp4" },
    onClose: noop
  };

  render() {
    const { source, onClose, visible } = this.props;
    return (
      <Modal visible={visible} transparent>
        <View style={styles.container}>
          <View style={styles.videoBox}>
            {visible ? (
              <Video
                source={source}
                ref={ref => {
                  this.player = ref;
                }}
                resizeMode="contain"
                style={styles.backgroundVideo}
              />
            ) : null}
          </View>
          <View style={styles.cancelBox}>
            <TouchableOpacity
              style={[styles.cancelBtn, { flex: 1 }]}
              activeOpacity={0.8}
              onPress={() => {
                onClose();
              }}
            >
              <Image style={styles.cancelImg} source={require("./close.png")} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: "rgba(0, 0, 0, 1)",
    justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0
  },
  videoBox: {
    position: "absolute",
    width: screenWidth,
    height: screenHeight - px2dp(100),
    backgroundColor: "rgba(0, 0, 0, 1)"
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 1)"
  },
  cancelBox: {
    width: px2dp(96),
    height: px2dp(96),
    position: "absolute",
    ..._.ifIphoneX({ top: px2dp(0 + 60) }, isAndroid ? { top: px2dp(0) } : { top: px2dp(0 + 30) }),
    left: 0,
    bottom: 0,
    right: 0
  },
  cancelBtn: {
    color: "#CCCAC8",
    paddingVertical: px2dp(48),
    paddingHorizontal: px2dp(48),
    position: "absolute"
  },
  cancelImg: {
    width: px2dp(28),
    height: px2dp(28)
  }
});
