/*
 * @Author: wangtao
 * @Date: 2020-07-28 08:23:07
 * @LastEditors: 汪滔
 * @LastEditTime: 2020-08-06 17:45:49
 * @Description: form中普通展示项
 */
import React, { Component } from 'react';
import { PixelRatio, StyleSheet, Text, View } from 'react-native';

import { screenWidth } from '../../styles';

export default class FormItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { labelName, placeholder, textStyle, style } = this.props;
    return (
      <View style={[styles.form_item, style]}>
        <Text style={styles.form_text}>{labelName}</Text>
        <View style={styles.form_context}>
          {typeof placeholder === 'string' ? (
            <Text
              textAlignVertica="top"
              allowFontScaling={false}
              style={[styles.select_text, { ...textStyle }]}
            >
              {placeholder}
            </Text>
          ) : (
            <View style={styles.rightCon}>{placeholder}</View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  form_item: {
    borderBottomColor: '#F0EFEF',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderStyle: 'solid',
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  form_text: {
    color: '#343332',
    fontSize: 14
  },
  form_context: {
    marginLeft: 20,
    flex: 1
  },
  select_text: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'right',
    width: screenWidth * 0.6,
    alignSelf: 'flex-end'
  },
  rightCon: {
    alignItems: 'flex-end'
  }
});
