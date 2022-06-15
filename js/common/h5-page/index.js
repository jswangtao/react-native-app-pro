/*
 * @Author: wangtao
 * @Date: 2020-08-25 10:31:57
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-06-15 18:33:02
 * @Description: H5嵌入组件
 */

import React, { Component } from "react";
import { StyleSheet, BackHandler, View, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import { msg, XMModal, XMHeader, XMLoading, XMIcon } from "@/common";
import { isAndroid, screenWidth, screenHeight, px2dp } from "@/styles";

class H5Page extends Component {
  static defaultProps = {
    visible: false,
    url: "",
    title: "H5Page"
  };

  constructor(props) {
    super(props);

    const { url, title } = props;
    this.state = {
      url: url,
      title: title,
      canGoBack: false
    };
  }
  render() {
    const { visible } = this.props;
    const { title } = this.state;

    if (visible && isAndroid) {
      BackHandler.addEventListener("hardwareBackPress", this._onClose);
    } else {
      BackHandler.removeEventListener("hardwareBackPress", this._onClose);
    }

    return (
      <XMModal mode="view" visible={visible}>
        <View style={styles.container}>
          <XMHeader title={title} renderLeft={this._renderLeft} />
          {visible && (
            <WebView
              originWhitelist={["*"]}
              ref={ref => (this.webView = ref)}
              source={this._getSource()}
              javaScriptEnabled={true}
              injectedJavaScript={this.setInjectedJavaScript()}
              allowUniversalAccessFromFileURLs={true}
              domStorageEnabled={true}
              scalesPageToFit={false}
              cacheEnabled={false}
              mixedContentMode="always"
              onMessage={this._onMessage}
              onError={this._onError}
              onLoadStart={this._onLoadStart}
              onLoadProgress={this._onLoadProgress}
              onNavigationStateChange={this._onNavigationStateChange}
              renderLoading={() => (
                <View style={styles.loading}>
                  <XMLoading text="加载中..." />
                </View>
              )}
              startInLoadingState={true}
            />
          )}
        </View>
      </XMModal>
    );
  }

  _getSource = () => {
    const { url } = this.props;
    return { uri: url };
  };

  _renderLeft = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={this._goBack} style={styles.headerBtn}>
          <XMIcon name={"back"} size={24} color={"#000"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this._onClose} style={styles.headerBtn}>
          <XMIcon name={"close"} size={24} color={"#000"} />
        </TouchableOpacity>
      </View>
    );
  };

  // 自定义返回逻辑
  _onClose = () => {
    msg.emit("app:h5", {
      isVisible: false
    });
    return true;
  };

  // 点击返回按钮
  _goBack = () => {
    const { canGoBack } = this.state;
    if (canGoBack) {
      this.webView.goBack();
    } else {
      this._onClose();
    }
  };

  _onMessage = e => {
    console.log("e-==========", e.nativeEvent);
    const data = JSON.parse(e.nativeEvent.data);
    if (data.type === "navigationStateChange") {
      // 这时记录下页面的可回退状态,然后通过ref获取该webview,调用它的goBack方法就可以了
      this.setState({
        canGoBack: e.nativeEvent.canGoBack
      });
    }
  };

  _onError = error => {
    if (__DEV__) console.log("error", error);
  };

  _onLoadStart = e => {
    console.log("🚀🚀🚀wimi======>>>_onLoadStart", e.nativeEvent);
  };
  _onLoadProgress = ({ nativeEvent }) => {
    console.log("🚀🚀🚀wimi======>>>_onLoadProgress", nativeEvent);
  };

  // 获取 webview 事件返回的 canGoBack 属性 ， 判断网页是否可以回退
  _onNavigationStateChange = navState => {
    console.log("🚀🚀🚀wimi======>>>_onNavigationStateChange", navState);

    this.setState({
      canGoBack: navState.canGoBack
    });
    // 正确获取时去修改title 并且是ios
    if (navState.title && navState.title.indexOf("http") === -1 && !isAndroid) {
      this.setState({
        title: navState.title
      });
    }
  };

  // 设置注入js
  setInjectedJavaScript = subScript => {
    // 注入一段js，解决Android无法监听navigationStateChange，在h5跳转时主动让js发送一个message，模拟navigationStateChange
    const injectedJavaScript = `
  (function() {
    function wrap(fn) {
      return function wrapper() {
        var res = fn.apply(this, arguments);
        window.ReactNativeWebView.postMessage(JSON.stringify({type:'navigationStateChange'}));
        return res;
      }
    }
  
    history.pushState = wrap(history.pushState);
    history.replaceState = wrap(history.replaceState);
    window.addEventListener('popstate', function() {
      window.ReactNativeWebView.postMessage(JSON.stringify({type:'navigationStateChange'})); // web端向APP端发送消息
    });
  })();
  ${subScript}
  true; 
  `;
    return injectedJavaScript;
  };
}
export default H5Page;
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff"
  },
  loading: {
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: screenWidth,
    height: screenHeight,
    zIndex: 10000
  },
  headerBtn: {
    width: px2dp(88),
    height: px2dp(88),
    alignItems: "center",
    justifyContent: "center"
  }
});
