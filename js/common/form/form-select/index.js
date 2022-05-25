/*
 * @Author: wangtao
 * @Date: 2020-10-13 09:25:53
 * @LastEditors: 汪滔
 * @LastEditTime: 2021-09-28 15:13:06
 * @Description: file content
 */
import React from 'react';
import { TouchableOpacity, Keyboard } from 'react-native';
import FormSelectBase from '../form-select-base/index';

export default class FormSelect extends React.PureComponent {
  static defaultProps = {
    disabled: false
  };

  render() {
    const { disabled, onPress, ...rest } = this.props;
    return (
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.8}
        onPress={() => {
          // 收起键盘
          Keyboard.dismiss();
          onPress();
        }}
      >
        <FormSelectBase {...rest} />
      </TouchableOpacity>
    );
  }
}
