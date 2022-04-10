import React from 'react';
import { PixelRatio, StyleSheet, Text, TextInput, View , Image } from 'react-native';
// import { priceColor } from 'styles';

export default class FormInput extends React.Component {
  state = {
    inputValue: this.props.defaultValue,
    errorPress: false,
    height: 0
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ inputValue: nextProps.defaultValue });
  }

  static defaultProps = {
    autoFocus: false,
    rightShow: false,
    inputType: 0
  };

  render() {
    const {
      label,
      placeholder,
      onChange,
      required,
      maxLength,
      textStyles,
      labelWidth,
      disabled,
      type,
      multiline,
      keyboardType,
      autoFocus,
      rightShow,
      inputType,
      boxStyle
    } = this.props;

    return (
      <View style={[styles.item,boxStyle]}>
        <Text style={[styles.text,labelWidth]} allowFontScaling={false}>
          {label}
          <Text allowFontScaling={false} style={styles.red}>
            {required && '*'}
          </Text>
        </Text>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          overflow: 'hidden'
        }}>
          {disabled ? (
            <Text
              allowFontScaling={false}
              style={[styles.valueText, { color: '#999'},textStyles]}
              numberOfLines={1}
            >
              {this.state.inputValue}
            </Text>
          ) : (
            <TextInput
              style={[{color:'black',},inputType==0?styles.textRight:styles.textLeft, textStyles]}
              editable={!disabled}
              placeholder={placeholder}
              value={this.state.inputValue}
              maxLength={maxLength}
              /*    onChangeText={()=>onChange()}*/
              onChangeText={(text) =>
                this._handelOnChange(text, onChange, type, maxLength)
              }
              underlineColorAndroid="transparent"
              multiline={multiline}
              keyboardType={keyboardType}
              autoFocus={autoFocus}
            />
          )}
        </View>
        {
            rightShow
            &&
            (
              <Image
                resizeMode="stretch"
                style={{
                  height:14,
                  width:14
                }}
                source={require('./p1.png')}
              />
            )
          }
      </View>
    );
  }

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
      text = ''; //110.和110。在react看来是一样的值，不会更新，所以先清空，再填值
      this.setState({ inputValue: this.state.inputValue });
      return;
    }
    let value = text;
    if (type == 'number' || type == 'tel') {
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
    borderBottomColor: '#ebebeb',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: '#ffffff'
  },
  textRight: {
    flex: 1,
    textAlign: 'right',
    fontSize: 14,
    color: '#333',
    paddingVertical: 0,
    overflow: 'hidden'
  },
  textLeft: {
    flex: 1,
    textAlign: 'left',
    fontSize: 14,
    color: '#333',
    paddingVertical: 0,
    overflow: 'hidden'
  },
  text: {
    fontSize: 14,
    color: '#333'
  },
  red: {
    // color: priceColor
  },
  valueText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    paddingVertical: 0,
    textAlign: 'right',
    paddingLeft: 10
  }
});
