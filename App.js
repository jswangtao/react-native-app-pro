/*
 * @Author: wangtao
 * @Date: 2022-04-08 23:21:03
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-10 16:12:39
 * @Description: file content
 */
import * as React from 'react';
import {Text, SafeAreaView} from 'react-native';

export default function App() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'pink',
      }}>
      <Text>This is top text.</Text>
      <Text>This is bottom text.</Text>
    </SafeAreaView>
  );
}
