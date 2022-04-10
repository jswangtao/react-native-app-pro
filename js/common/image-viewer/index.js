/*
 * @Author: wangtao
 * @Date: 2021-08-16 14:36:01
 * @LastEditors: 汪滔
 * @LastEditTime: 2021-12-18 17:19:20
 * @Description: file content
 */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Text,
  Image,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import lodash from 'lodash';
import { px2dp, isAndroid, screenWidth } from '../styles';
import * as _ from '../util';

export default class XMImageViewer extends Component {
  static defaultProps = {
    index: 0, // 初始显示第几张图片
    visible: false,
    closeIcon: false,
    closeText: '',
    onClose: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    let { index, visible, closeIcon, closeText, onClose, imageUris, imageUrls, ...rest } = this.props;
    if (!imageUrls) {
      imageUrls = [];
    }
    if (imageUris) {
      let uris = lodash.cloneDeep(imageUris);
      imageUrls = uris.map((item) => {
        item.url = item.uri;
        return item;
      });
    }
    return (
      <Modal visible={visible} transparent>
        <ImageViewer
          index={index}
          loadingRender={this._renderLoad}
          renderIndicator={this._renderIndicator}
          onClick={onClose}
          imageUrls={imageUrls || []}
          {...rest}
          // 属性放在rest参数后面，外部复写将失效，可视为禁用外部自定义
          saveToLocalByLongPress={false}
        />
      </Modal>
    );
  }

  _renderIndicator = (currentIndex, allSize) => {
    const { closeIcon, closeText, onClose, onChange } = this.props;
    return (
      <View style={styles.indicatorWrap}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.closeBtn}
          onPress={onClose}
        >
          {closeIcon ? (
            <Image
              style={styles.iconCloseImg}
              source={require('./icon_close_white.png')}
            />
          ) : (
            <Text style={styles.closeText}>{closeText || '关闭'}</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.indicatorLabel}>
          {currentIndex}
          /
          {allSize}
        </Text>
      </View>
    );
  };

  _renderLoad = () => {
    return (
      <View style={{}}>
        <ActivityIndicator size='small' />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  iconCloseImg: {
    width: px2dp(30),
    height: px2dp(30),
  },
  closeBtn: {
    width: px2dp(88),
    height: px2dp(88),
    position: 'absolute',
    ..._.ifIphoneX(
      { top: px2dp(0) },
      isAndroid ? { top: px2dp(0) } : { top: px2dp(10) },
    ),
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3000,
  },
  closeText: {
    fontSize: px2dp(28),
    color: '#FFFFFF',
  },
  indicatorWrap: {
    position: 'absolute',
    ..._.ifIphoneX(
      { top: px2dp(80) },
      isAndroid ? { top: px2dp(0) } : { top: px2dp(10) },
    ),
    width: screenWidth,
    height: px2dp(80),
    justifyContent: 'center',
    alignItems: 'center'

  },
  indicatorLabel: {
    color: '#FFFFFF',
    fontSize: px2dp(32)
  }
});
