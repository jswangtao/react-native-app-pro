/*
 * @Author: wangtao
 * @Date: 2020-06-24 10:52:16
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-02-19 20:34:14
 * @Description: 主要与样式及适配相关
 */

import { Dimensions, Platform } from "react-native";

const mainBgColorDeepGray = "#F0F0F0"; // 主背景色 灰
const mainBgColorLightGray = "#F8F8F8"; // 主背景色 淡灰
const mainBgColorSecLightGray = "#FCFCFC"; // 主背景色 次淡灰
const mainBgColorWhite = "#FFFFFF"; // 主背景色 白色
const mainBgColorBlack = "#000000"; // 主题背景色 黑色

const fontColorRed = "#FF5740"; // 字体色 红
const fontColorLightRed = "#FFF2F0"; // 字体色 淡红
const fontColorDeepRed = "#FF4026"; // 字体色 深红

const fontColorBlack = "#333333"; // 字体色  黑色
const fontColorDeepGray = "#666666"; // 字体色 深灰色
const fontColorSecDeepGray = "#999999"; // 字体色 次深灰色
const fontColorLightGray = "#CCCCCC"; // 字体色 浅灰色
const splitLineColorLightGray = "#E6E6E6"; // 边框分割线色 浅灰色

const fontColorCoffee = "#BB934B"; // 字体色 咖啡色
const fontColorLightCoffee = "#F1E9DB"; // 字体色 浅咖啡色

const fontColorGreen = "#8DE68A"; // 字体色 绿色
const fontColorDeepGreen = "#2CBF26"; // 字体色 深绿色
const fontColorLightGreen = "#E7FFE6"; // 字体色 浅绿色

const fontColorOrange = "#FFD19C"; // 字体色 橙色
const fontColorDeepOrange = "#EF9730"; // 字体色 橙色
const fontColorLightOrange = "#FFF8EB"; // 字体色 橙色
const fontColorWhite = "#FFFFFF"; // 字体色 白色

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

export {
  isAndroid,
  isIOS,
  screenWidth,
  screenHeight,
  px2dp,
  mainBgColorDeepGray,
  mainBgColorLightGray,
  mainBgColorSecLightGray,
  mainBgColorWhite,
  mainBgColorBlack,
  fontColorBlack,
  fontColorDeepGray,
  fontColorSecDeepGray,
  fontColorLightGray,
  fontColorDeepGreen,
  fontColorGreen,
  fontColorLightGreen,
  fontColorCoffee,
  fontColorLightCoffee,
  fontColorWhite,
  fontColorOrange,
  fontColorDeepOrange,
  fontColorLightOrange,
  fontColorDeepRed,
  fontColorRed,
  fontColorLightRed,
  splitLineColorLightGray
};
