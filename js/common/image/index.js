import React from "react";
import { View, Image, Animated, Easing, StyleSheet, TouchableOpacity, Text } from "react-native";
import { px2dp } from "../../styles";
import XMImageViewer from "../image-viewer";
const noop = () => {};
const loadingError = require("./loading_error.png");
export default class XMImage extends React.Component {
  static defaultProps = {
    width: 100,
    height: 100,
    source: null, // // 1.没传source  2.source为number本地图片  3.source为''
    defaultSource: null,
    preview: false, //是否可以预览图片
    style: {},
    resizeMode: "contain",
    onLoad: noop,
    onError: noop,
    onClick: noop
  };

  constructor(props) {
    super(props);
    this.state = {
      loadStatus: "pending",
      backgroundColor: new Animated.Value(0),
      isVisible: false
    };
  }

  componentWillUnmount() {
    if (undefined !== this.backgroundColorAnimated) {
      this.backgroundColorAnimated.stop();
    }
  }

  render() {
    let { width, height, style, source, resizeMode } = this.props;
    let { loadStatus } = this.state;
    // 1.没传source
    if (!source) {
      source = loadingError;
    } else {
      // 2.判断是否是网络图片
      if (String.prototype.indexOf.call(source, "http") !== -1) {
        source = { uri: source };
      }
      // 3.source为number本地图片
      // source=source
    }

    return (
      <View style={[styles.container, style]}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => this._onClick()}>
          <Image
            source={source}
            style={{ width, height }}
            onLoadStart={this._onLoadStart}
            onLoadEnd={this._onLoadEnd}
            onLoad={this.handleImageLoaded}
            onError={this.handleImageErrored}
            resizeMode={resizeMode}
          />
        </TouchableOpacity>
        {loadStatus === "pending" && this._renderPending()}
        {loadStatus === "error" && this._renderError()}
        {this._renderPreView()}
      </View>
    );
  }

  // 预览界面
  _renderPreView = () => {
    let { source, preview } = this.props;
    let { isVisible } = this.state;
    return preview ? (
      <XMImageViewer
        sources={[source]}
        visible={isVisible}
        onClose={() => {
          this.setState({ isVisible: false });
        }}
      />
    ) : null;
  };

  _onClick = () => {
    let { source, onClick, preview } = this.props;
    if (preview) {
      this.setState({ isVisible: true });
    }
    onClick(source);
  };

  /**
   * 图片资源开始加载
   */
  _onLoadStart = () => {
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
      this.state.loadStatus === "pending" && this._onLoadStart();
    });
  };

  /**
   * 加载结束
   */
  _onLoadEnd = () => {
    // if (undefined !== this.backgroundColorAnimated) this.backgroundColorAnimated.stop();
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
  _renderPending = () => {
    const { width, height } = this.props;
    return (
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
            width: width / 2,
            height: width / 2
          }}
          source={require("./loading.gif")}
        />
      </Animated.View>
    );
  };

  /**
   * 渲染加载失败界面
   */
  _renderError = () => {
    let { width, height, defaultSource, emptyDesc } = this.props;
    let iconSize = {
      width: width / 2,
      height: width / 2
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
          <Image source={loadingError} style={[iconSize]} resizeMode="contain" />
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
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden"
  }
});
