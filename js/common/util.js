/*
 * @Author: wangtao
 * @Date: 2020-06-30 20:02:03
 * @LastEditors: 汪滔
 * @LastEditTime: 2020-10-10 15:38:44
 * @Description: 工具
 */
import { Dimensions, Platform } from 'react-native';

/**
 * 是否是iPhonex
 */
export function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios'
    && !Platform.isPad
    && !Platform.isTVOS
    && (dimen.height >= 812 || dimen.width >= 812)
  );
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}
