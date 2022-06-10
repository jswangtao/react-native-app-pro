/**
 * 因为自带的modal导致全局toast看不到，所以经常用view写的，也可以用基于modal写的
 *
 */

import React, { Component } from "react";
import { StyleSheet, Modal, Animated, TouchableOpacity } from "react-native";
import { screenHeight, screenWidth } from "../../styles";

export default class XMModal extends Component {
  static defaultProps = {
    visible: false,
    type: "view" //modal view
  };
  constructor(props) {
    super(props);
    this.state = {
      y: new Animated.Value(screenHeight),
      isShow: props.visible
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      this.startAnimation();
    } else {
      this.endAnimation();
    }
    this.setState({ isShow: nextProps.visible });
  }

  render() {
    const { children, type } = this.props;
    const { isShow } = this.state;
    if (type === "view") {
      return (
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [{ translateY: this.state.y }]
            }
          ]}
        >
          <TouchableOpacity
            style={styles.mask}
            onPress={() => {
              this._onChangeVisible();
            }}
          />
          {children}
        </Animated.View>
      );
    }

    if (type === "modal") {
      return (
        <Modal animationType="slide" transparent visible={isShow}>
          <TouchableOpacity
            style={styles.modalContainer}
            onPress={() => {
              this._onChangeVisible();
            }}
          >
            {children}
          </TouchableOpacity>
        </Modal>
      );
    }
    return null;
  }

  // 出现时动画
  startAnimation = () => {
    // this.state.y.setValue(100)
    Animated.timing(
      // 随时间变化而执行的动画类型
      this.state.y, // 动画中的变量值
      {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }
    ).start();
  };

  // 消失时动画
  endAnimation = () => {
    Animated.timing(
      // 随时间变化而执行的动画类型
      this.state.y, // 动画中的变量值
      {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true
      }
    ).start();
  };
  _onChangeVisible = () => {
    const { isShow } = this.state;
    if (isShow) {
      this.endAnimation();
      this.setState({ isShow: false });
    } else {
      this.startAnimation();
      this.setState({ isShow: true });
    }
  };
}

const styles = StyleSheet.create({
  // 模态
  modalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)"
  },
  mask: {
    position: "absolute",
    top: 0,
    left: 0,
    width: screenWidth,
    height: screenHeight
  }
});
