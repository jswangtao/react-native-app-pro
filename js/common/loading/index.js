/*
 * @Author: wangtao
 * @Date: 2020-09-04 11:22:31
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-06-02 19:59:43
 * @Description: file content
 */
import React, { Component } from "react";
import { Text, View, StyleSheet, Animated, Easing } from "react-native";
import { screenWidth, screenHeight } from "../../styles";

export default class Loading extends Component {
  static defaultProps = {
    full: false,
    text: "",
    style: {},
    textStyle: {}
  };
  constructor(props) {
    super(props);
    const { full } = this.props;
    this.state = {
      full: !!full
    };
    this.spinValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.spin();
  }

  render() {
    const { style, textStyle } = this.props;
    // 映射 0-1的值 映射 成 0 - 360 度
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1], // 输入值
      outputRange: ["0deg", "360deg"] // 输出值
    });
    return (
      <View style={this.state.full ? styles.fullCont : styles.container}>
        <View style={[styles.textWrap, style]}>
          <Animated.Image
            style={[styles.img, { transform: [{ rotate: spin }] }]}
            resizeMode="stretch"
            source={require("./loading.png")}
          />
          {!!this.props.text && <Text style={[{ fontSize: 12, paddingTop: 10 }, textStyle]}>{this.props.text}</Text>}
        </View>
      </View>
    );
  }

  // 旋转方法
  spin = () => {
    this.spinValue.setValue(0);
    Animated.timing(this.spinValue, {
      toValue: 1, // 最终值 为1，这里表示最大旋转 360度
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => this.spin());
  };
}

const styles = StyleSheet.create({
  fullCont: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 9,
    width: screenWidth,
    height: screenHeight,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  img: {
    width: screenWidth * 0.06,
    height: screenWidth * 0.06
  },
  textWrap: {
    alignItems: "center"
    // backgroundColor:'red'
  }
});
