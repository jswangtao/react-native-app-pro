import React from 'react';
import { TouchableOpacity, Keyboard } from 'react-native';
import FormSelectBase from '../form-select-base/index';

export default class FormSelect extends React.Component {
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
