/*
 * @Author: wangtao
 * @Date: 2020-07-27 11:28:08
 * @LastEditors: 汪滔
 * @LastEditTime: 2020-08-06 18:36:13
 * @Description: file content
 */ 
import React from 'react';
import { Image, PixelRatio, StyleSheet, Text, View } from 'react-native';

/**
 * 不带可点击按钮的FormSelect样式
 */
export default class FormSelectBase extends React.Component {
  static defaultProps = {
    iconVisible: true
  };

  render() {
    const { label, selected, placeholder, iconVisible,textStyles ,labelWidth,style} = this.props;

    return (
      <View style={[styles.item,style]}>
        <Text style={[styles.text,labelWidth ]} allowFontScaling={false}>
          {label}
        </Text>
        <View style={styles.right}>
          <Text style={[styles.textRight,textStyles,(selected && selected.value) && {color:'#343332'} ]} allowFontScaling={false} numberOfLines={1}>
            {selected && selected.value ? selected.value : placeholder}
          </Text>
          {iconVisible ? (
            <Image source={require('./img/p1.png')} resizeMode="stretch" style={styles.img} />
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#F0EFEF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 15,
    backgroundColor: '#ffffff'
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  textRight: {
    fontSize: 14,
    color: '#999896',
    flex: 1,
    textAlign: 'right'
  },
  img: {
    height:14,
    width:14
  },
  text: {
    fontSize: 14,
    color: '#333'
  }
});
