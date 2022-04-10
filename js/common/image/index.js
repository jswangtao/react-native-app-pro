import React from "react";
import { View, Image, Animated, Easing, StyleSheet, Platform, TouchableOpacity, Text } from "react-native";
import { px2dp } from "../styles";

export default class LoadImage extends React.Component {
  static defaultProps = {
    width: px2dp(200),
    height: px2dp(200),
    source: {},
    defaultSource: null,
    style: {},
    resizeMode: "stretch",
    type: "animated", //加载时的图片不一样  'animated', 'load'
    onLoad: () => {},
    onError: () => {},
    onClick: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      loadStatus: "pending",
      backgroundColor: new Animated.Value(0)
    };
  }

  componentWillUnmount() {
    if (undefined !== this.backgroundColorAnimated) {
      this.backgroundColorAnimated.stop();
    }
  }

  /**
   * 图片资源开始加载
   */
  onLoadStart = () => {
    // 配置加载动画
    if (this.props.type !== "animated") return;
    this.backgroundColorAnimated = Animated.sequence([
      Animated.timing(this.state.backgroundColor, {
        toValue: 1,
        easing: Easing.ease,
        duration: 800,
        useNativeDriver: false
      }),
      Animated.timing(this.state.backgroundColor, {
        toValue: 0,
        easing: Easing.in,
        duration: 800,
        useNativeDriver: false
      })
    ]);
    // 开启循环动画
    this.backgroundColorAnimated.start(() => {
      this.state.loadStatus === "pending" && this.onLoadStart();
    });
  };

  /**
   * 加载结束
   */
  onLoadEnd = () => {
    // if (undefined !== this.backgroundColorAnimated) this.backgroundColorAnimated.stop()
  };

  /**
   * 加载成功
   */
  handleImageLoaded = () => {
    this.setState({ loadStatus: "success" }, () => {
      this.props.onLoad();
    });
  };

  /**
   * 加载失败
   * @param {*} error
   */
  handleImageErrored = error => {
    console.log(error);
    this.setState({ loadStatus: "error" }, () => {
      this.props.onError();
    });
  };

  /**
   * 渲染加载中界面
   */
  renderPending = () => {
    const { width, height, type } = this.props;
    return type === "animated" ? (
      <Animated.View
        style={[
          {
            width,
            height,
            position: "absolute",
            backgroundColor: this.state.backgroundColor.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: ["#EBEBEB", "#F5F5F5", "#EBEBEB"]
            }),
            alignItems: "center",
            justifyContent: "center"
          }
        ]}
      >
        <Image
          style={{
            width: width / 3,
            height: width / 3
          }}
          source={require("./loading.gif")}
        />
      </Animated.View>
    ) : (
      <View
        style={[
          {
            width,
            height,
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#eceff4"
          }
        ]}
      >
        <Image style={{ width: 30, height: 30 }} source={require("./loading-spinner.gif")} />
      </View>
    );
  };

  /**
   * 渲染加载失败界面
   */
  renderError = () => {
    let { width, height, defaultSource, emptyDesc } = this.props;
    console.log("🚀🚀🚀wimi======>>>defaultSource", defaultSource);
    let iconSize = {
      width: width / 3,
      height: width / 3
    };
    return (
      <View
        style={[
          {
            width,
            height,
            justifyContent: "center",
            backgroundColor: "#eceff4",
            position: "absolute",
            alignItems: "center"
          }
        ]}
      >
        {defaultSource ? (
          <Image source={defaultSource} style={[iconSize]} resizeMode="contain" />
        ) : (
          <Image source={require("./pic_error.png")} style={[iconSize]} resizeMode="contain" />
        )}
        <Text
          style={[
            {
              fontSize: px2dp(26),
              color: "#BFBDBB"
            }
          ]}
        >
          {emptyDesc}
        </Text>
      </View>
    );
  };

  render() {
    let { width, height, style, source, onClick, resizeMode } = this.props;
    let { loadStatus } = this.state;
    // 兼容 uri为null的情况
    if (source.hasOwnProperty("uri") && typeof source.uri !== "string") {
      source = { ...source, uri: "" };
    }
    // 兼容Androud无法对空字符串进行处理情况
    if (Platform.OS === "android" && source.hasOwnProperty("uri") && !source.uri) {
      source = { ...source, uri: " " };
    }
    return (
      <View style={[styles.container, style]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            if (source.uri && source.uri.indexOf("http") !== -1 && source.uri.indexOf("?") !== -1) {
              let queryParamsStr = "";
              let uriArr = source.uri.split("?");
              let queryParamsArr = uriArr[1].split("&");
              let strArr = queryParamsArr.filter(item => {
                if (item.indexOf("oss") === -1) {
                  return true;
                }
                return false;
              });
              queryParamsStr = `${uriArr[0]}?${strArr.join("&")}`;
              onClick(queryParamsStr);
              return;
            }
            onClick(source.uri);
          }}
        >
          <Image
            source={source}
            style={[{ width, height }]}
            onLoadStart={this.onLoadStart}
            onLoadEnd={this.onLoadEnd}
            onLoad={this.handleImageLoaded}
            onError={this.handleImageErrored}
            resizeMode={resizeMode}
          />
        </TouchableOpacity>
        {loadStatus === "pending" && this.renderPending()}
        {loadStatus === "error" && this.renderError()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden"
  }
});
