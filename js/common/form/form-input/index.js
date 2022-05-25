import React from "react";
import { PixelRatio, StyleSheet, Text, TextInput, Dimensions, View, Image } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window"); // 屏幕宽高
const uiWidthPx = 750;

const px2dp = uiElementPx => {
  if (screenWidth > screenHeight) {
    return (uiElementPx * screenHeight) / uiWidthPx;
  }
  return (uiElementPx * screenWidth) / uiWidthPx;
};

const noop = () => {};

export default class FormInput extends React.Component {
  static defaultProps = {
    label: "", // label文本
    labelWidth: null, // label宽度
    labelStyle: null, // label样式
    placeholder: "请输入", // placeholder
    style: null, // box样式(为了统一命名方式)
    required: false, // 是否必须
    maxLength: 10000, // 输入最大长度
    inputType: 0, // 0输入框文本靠右，1输入框文本靠左
    disabled: false, // 禁用
    textStyles: null, // 禁用文本样式和inputText样式
    keyboardType: "default", // 键盘
    autoFocus: false,
    multiline: false,
    numberOfLines: 1,
    icon: require("./img/icon_edit_gray.png"),
    iconVisible: false,
    onChange: noop, // 输入函数
    renderRight: null, // 右边小装饰
    onClick: noop // 当为禁用时刻点击触发
  };

  constructor(props) {
    super(props);
    this.state = {
      inputValue: props.defaultValue,
      errorPress: false,
      height: 0
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ inputValue: nextProps.defaultValue });
  }

  render() {
    const {
      label,
      labelWidth,
      labelStyle,
      placeholder,
      onChange,
      style,
      required,
      maxLength,
      disabled,
      inputType,
      textStyles,
      type,
      multiline,
      numberOfLines,
      keyboardType,
      autoFocus,
      onClick
    } = this.props;
    return (
      <View style={[styles.item, style]}>
        <Text style={[styles.text, labelWidth, labelStyle]} allowFontScaling={false}>
          <Text allowFontScaling={false} style={styles.red}>
            {required && "*"}
          </Text>
          {label}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            overflow: "hidden"
          }}
        >
          {disabled ? (
            <Text
              allowFontScaling={false}
              style={[styles.valueText, { color: "#999" }, textStyles]}
              onPress={() => onClick && onClick()}
              numberOfLines={1}
            >
              {this.state.inputValue}
            </Text>
          ) : (
            <TextInput
              style={[{ color: "black" }, inputType === 0 ? styles.textRight : styles.textLeft, textStyles]}
              editable={!disabled}
              placeholder={placeholder}
              placeholderTextColor="#CDCBC8"
              value={this.state.inputValue}
              maxLength={maxLength}
              onChangeText={text => this._handelOnChange(text, onChange, type, maxLength)}
              underlineColorAndroid="transparent"
              multiline={multiline}
              numberOfLines={numberOfLines}
              keyboardType={keyboardType}
              autoFocus={autoFocus}
            />
          )}
        </View>
        {/* 最右添加按钮等小部件 */}
        {this._renderRight()}
      </View>
    );
  }

  _renderRight = () => {
    const { icon, iconVisible, renderRight } = this.props;
    if (!iconVisible) {
      return null;
    }
    if (renderRight) {
      return renderRight();
    }
    return <Image source={icon} resizeMode="stretch" style={styles.img} />;
  };

  /**
   * 解决type='number'的时候，maxlength不兼容的问题
   *
   * @param text
   * @param onChangeFun
   * @param type
   * @param maxLength
   * @private
   */
  _handelOnChange = (text, onChangeFun, type, maxLength) => {
    if (this.state.errorPress) {
      text = ""; // 110.和110。在react看来是一样的值，不会更新，所以先清空，再填值
      this.setState({ inputValue: this.state.inputValue });
      return;
    }
    let value = text;
    if (type === "number" || type === "tel") {
      if (value.length <= maxLength) {
        this.setState({ inputValue: value });
      } else {
        this.setState({
          inputValue: this.state.inputValue.slice(0, maxLength)
        });
        return;
      }
    } else {
      this.setState({ inputValue: value });
    }
    onChangeFun && onChangeFun(text);
  };
}

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: "#ebebeb",
    width: "100%",
    height: px2dp(104),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // paddingLeft: 12,
    // paddingRight: 12,
    backgroundColor: "#ffffff"
  },
  textRight: {
    flex: 1,
    textAlign: "right",
    fontSize: px2dp(28),
    color: "#333",
    paddingVertical: 0,
    overflow: "hidden"
  },
  textLeft: {
    flex: 1,
    textAlign: "left",
    fontSize: px2dp(28),
    color: "#333",
    paddingVertical: 0,
    overflow: "hidden"
  },
  text: {
    fontSize: px2dp(28),
    color: "#333"
  },
  red: {
    color: "#ff1f4e"
  },
  valueText: {
    flex: 1,
    fontSize: px2dp(28),
    color: "#333",
    paddingVertical: 0,
    textAlign: "right",
    paddingLeft: 3,
    lineHeight: 50
  },
  img: {
    height: 12,
    width: 12,
    marginLeft: 4
  }
});
