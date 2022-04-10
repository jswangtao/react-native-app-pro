/*
 * @Author: wangtao
 * @Date: 2020-09-15 14:36:39
 * @LastEditors: 汪滔
 * @LastEditTime: 2020-10-12 17:28:57
 * @Description: listview
 */

import React, { Component } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';
import { screenWidth, px2dp } from '@/styles';
import {
  msg, XMListView, XMEmpty, XMImage,
} from '@/common';
import { empty03 } from '@/images';

export default class GoodsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    return (
      <View style={styles.container}>
        {/* 商品列表 */}
        <XMListView
          url="shop-api/api/v1/pi/getGoodsInfoApp"
          methods="GET"
          params={{ gcCode: 'stsp', categoryId: null }}
          dataPropsName="data.goods"
          renderRow={(item, index) => this._renderItem(item, index)}
          renderHeader={() => <></>}
          renderEmpty={() => (
            <XMEmpty
              emptyImg={empty03}
              boxStyle={{ marginTop: px2dp(180) }}
              desc="暂无商品"
            />
          )}
          columnWrapperStyle={styles.bigBox}
          style={{ }}
          numColumns={2}
          returnScroll={(event) => {
            if (event.nativeEvent.contentOffset.y > px2dp(420)) {
              this.setState({ categorysOptionIsShow: true });
            } else {
              this.setState({ categorysOptionIsShow: false });
            }
          }}
        />
      </View>
    );
  }

  _renderItem = (item) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.itemContainer}
      key={item.id}
      onPress={() => {
        msg.emit('router: goToNext', {
          routeName: 'GoodsDetail',
          id: item.id,
        });
      }}
    >
      <View style={styles.goodsPic}>
        <XMImage src={item.picFileId} />
      </View>
      <View style={styles.productInfo}>
        <View>
          <Text numberOfLines={2} style={styles.title}>
            {item.name}
          </Text>
        </View>
        <View style={styles.flex}>
          <Text
            style={{ fontSize: px2dp(36), color: '#000', fontWeight: 'bold' }}
          >
            <Text style={{ fontSize: px2dp(24) }}>¥</Text>
            {item.currentPrice}
            &nbsp;&nbsp;
          </Text>
          <View style={styles.return} />
        </View>
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  itemContainer: {
    width: px2dp(342),
    height: px2dp(527),
    borderRadius: px2dp(12),
    overflow: 'hidden',
    marginTop: px2dp(16),
    backgroundColor: '#fff',
  },
  goodsPic: {
    width: px2dp(342),
    height: px2dp(342),
  },
  bigBox: {
    justifyContent: 'space-between',
    paddingHorizontal: px2dp(24),
    width: screenWidth,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: 'rgba(52,51,50,1)',
    fontSize: px2dp(28),
    lineHeight: px2dp(40),
  },
  productInfo: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    padding: px2dp(16),
  },
});
