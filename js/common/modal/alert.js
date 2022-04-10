/*
 * @Author: wangtao
 * @Date: 2020-10-12 14:29:53
 * @LastEditors: 汪滔
 * @LastEditTime: 2020-10-12 14:32:07
 * @Description: file content
 */
import { Alert as NativeAlert } from 'react-native';

/**
 * 只有一个确定按钮的alert
 * @param title
 * @param text
 * @param fn
 * @constructor
 */
export const Alert = ({
  title, // 标题
  text, // 内容
  fn, // 关闭后回调
  fnText = '确定',
}) => {
  NativeAlert.alert(title, text, [{ text: fnText, onPress: () => fn && fn() }]);
};
