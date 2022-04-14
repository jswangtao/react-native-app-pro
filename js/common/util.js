/*
 * @Author: wangtao
 * @Date: 2020-06-30 20:02:03
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-13 00:11:03
 * @Description: 工具
 */
import { Dimensions, Platform, NativeModules, StatusBar } from "react-native";

const { StatusBarManager } = NativeModules;

/**
 *防抖
 * @param {*} func 要进行debouce的函数
 * @param {*} wait 等待时间,默认500ms
 * @param {*} immediate 是否立即执行
 */
export function debounce(func, wait = 500, immediate = false) {
  let timeout;
  let callNow = true;
  return function (...rest) {
    let context = this;
    let args = rest;
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      // 如果已经执行过，不再执行
      if (callNow) {
        callNow = false;
        func.apply(context, args);
      }
      timeout = setTimeout(() => {
        callNow = true;
      }, wait);
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
  };
}

// 节流
export function throttle(fn, wait) {
  var timer = null;
  return function () {
    var context = this;
    var args = arguments;
    if (!timer) {
      timer = setTimeout(function () {
        fn.apply(context, args);
        timer = null;
      }, wait);
    }
  };
}

/**
 * 是否是iPhonex
 */
export function isIphoneX() {
  const dimen = Dimensions.get("window");
  return Platform.OS === "ios" && !Platform.isPad && !Platform.isTVOS && (dimen.height >= 812 || dimen.width >= 812);
}

/**
 * iPhonex的样式和普通样式
 */
export function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}

/**
 * 获取状态栏高度
 */
let oStatusHeight = 0;
export function getStatusBarHeight(callback?: (height: number) => void) {
  if (oStatusHeight) {
    callback && callback(oStatusHeight);
    return oStatusHeight;
  }
  if (Platform.OS === "ios") {
    // iOS Only
    if (StatusBarManager && StatusBarManager.getHeight) {
      StatusBarManager.getHeight((statusBar: { height: number }) => {
        const { height } = statusBar;
        oStatusHeight = height;
        callback && callback(oStatusHeight);
      });
    }
  } else {
    const { currentHeight } = StatusBar;
    oStatusHeight = currentHeight || 0;
    callback && callback(oStatusHeight);
  }
}
// 在这里执行一次,是因为获取状态栏高度为异步获取,
// 所以导致不能及时获取到高度，提前调用一下可以在使用之前就已经给`oStatusHeight`赋好值，就不会出现获取失败的情况了
getStatusBarHeight();
