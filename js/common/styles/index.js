/*
 * @Author: wangtao
 * @Date: 2022-04-10 23:22:26
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-06-01 18:52:24
 * @Description: 主要用于业务的色卡，适配
 */
import { Dimensions, Platform } from "react-native";

const color_F0F0F0 = "#F0F0F0"; // 主背景色 灰
const color_F8F8F8 = "#F8F8F8"; // 主背景色 淡灰
const color_FFFFFF = "#FFFFFF"; // 主背景色 白色
const color_000000 = "#000000"; // 主题背景色 黑色

const color_333333 = "#333333"; // 字体色  黑色
const color_666666 = "#666666"; // 字体色 深灰色
const color_999999 = "#999999"; // 字体色 次深灰色
const color_CCCCCC = "#CCCCCC"; // 字体色 浅灰色
const color_E6E6E6 = "#E6E6E6"; // 边框分割线色 浅灰色

const color_2A64F4 = "#2A64F4";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window"); // 屏幕宽高

const isAndroid = Platform.OS === "android"; // 判断是否为安卓
const isIOS = Platform.OS === "ios"; // 判断是否为iOS

// 添加pxToDp
// UI图设计基准大小
const uiWidthPx = 750;

function px2dp(uiElementPx) {
  if (screenWidth > screenHeight) {
    return (uiElementPx * screenHeight) / uiWidthPx;
  }
  return (uiElementPx * screenWidth) / uiWidthPx;
}

let customerStyleSheet = {
  create(style) {
    let s = { ...style };
    // 目前仅对以下的属性进行处理
    let list = [
      "width",
      "height",
      "marginTop",
      "marginBottom",
      "marginLeft",
      "marginRight",
      "paddingTop",
      "paddingRight",
      "paddingBottom",
      "paddingLeft",
      "top",
      "right",
      "bottom",
      "left",
      "fontSize",
      "lineHeight"
    ];
    for (let outKey in s) {
      for (let innerKey in s[outKey]) {
        if (list.includes(innerKey) && typeof s[outKey][innerKey] === "number") {
          s[outKey][innerKey] = px2dp(s[outKey][innerKey]);
        }
      }
    }
    return StyleSheet.create(s);
  }
};

export {
  isAndroid,
  isIOS,
  screenWidth,
  screenHeight,
  px2dp,
  customerStyleSheet,
  color_F0F0F0,
  color_F8F8F8,
  color_FFFFFF,
  color_000000,
  color_333333,
  color_666666,
  color_999999,
  color_CCCCCC,
  color_E6E6E6,
  color_2A64F4
};
