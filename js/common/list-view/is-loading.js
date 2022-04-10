/*
 * @Author: wangtao
 * @Date: 2020-09-04 11:05:35
 * @LastEditors: 汪滔
 * @LastEditTime: 2020-09-27 11:53:24
 * @Description: file content
 */
import React from 'react';
import { Text, View,Image ,ActivityIndicator,Animated,Easing,StyleSheet} from 'react-native';
import { screenWidth } from '../styles';
export default class IsLoading extends React.Component {
  constructor(props){
    super(props)
   
    this.spinValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.spin();
  }
  //旋转方法
  spin = () => {
    this.spinValue.setValue(0);
    Animated.timing(this.spinValue, {
      toValue: 1, // 最终值 为1，这里表示最大旋转 360度
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true 
    }).start(() => this.spin());
  };

  render() {
     //映射 0-1的值 映射 成 0 - 360 度
     const spin = this.spinValue.interpolate({
      inputRange: [0, 1], //输入值
      outputRange: ['0deg', '360deg'], //输出值
    });
    return (
        <View
            style={{
              height: 50,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection:'row'
            }}
        >
          <Animated.Image
              style={[styles.img, {transform: [{rotate: spin}]}]}
              resizeMode="stretch"
              source={require('../loading/loading.png')}
          />
          {/* <ActivityIndicator size="small" color="#999" /> */}
          <Text style={{ color: '#999',textAlign: 'center',padding: 5 }}>正在加载更多</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    width: screenWidth * 0.06,
    height: screenWidth * 0.06
  }
});

