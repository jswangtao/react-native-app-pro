/*
 * @Author: wangtao
 * @Date: 2022-04-10 03:18:35
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-10 14:05:09
 * @Description: file content
 */
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Button} from 'react-native';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <Text>Main Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'pink',
  },
});
