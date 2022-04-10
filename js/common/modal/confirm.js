import { Alert } from 'react-native';

/**
 * 两个按钮的alert
 * @param title
 * @param text
 * @param okFn
 * @param cancelFn
 * @param okText
 * @param cancelText
 * @constructor
 */
export const Confirm = ({
  title, // 标题
  text, // 内容文字
  okFn, // 点击确认回调函数
  cancelFn, // 点击取消回调函数
  okText, // 确认按钮文案
  cancelText, // 取消按钮文案
}) => {
  const buttonArray = !cancelText
    ? [{ text: okText, onPress: () => okFn() }]
    : [
      {
        text: cancelText,
        style: 'cancel',
        onPress: () => cancelFn && cancelFn(),
      },
      { text: okText, onPress: () => okFn() },
    ];

  Alert.alert(title, text, buttonArray);
};
