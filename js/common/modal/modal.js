import React from 'react';
import { Modal } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { Modal } from 'antd-mobile';

/**
 *
 * @param title 标题
 * @param message 描述信息
 * @param callbackOrActions  按钮组 {text, onPress} 或回调函数
 * @param type   样式，
 * @param defaultValue
 * @param placeholders
 * @param platform 组件的平台特有样式
 * @constructor
 */
export function WmPrompt(
  title,
  message,
  callbackOrActions,
  type,
  defaultValue,
  placeholders,
  platform,
) {
  Modal.prompt(
    title,
    message,
    callbackOrActions,
    type,
    defaultValue,
    placeholders,
    platform,
  );
}

export default class WmModal extends React.Component {
  render() {
    const {
      visible, onClose, title, footer,
    } = this.props;
    return (
      !!visible && (
        <KeyboardAwareScrollView
          ref={(ref) => (this._scroll = ref)}
          onScroll={(event) => {
            window.y = event.nativeEvent.contentOffset.y;
          }}
        >
          <Modal
            visible={visible}
            transparent
            maskClosable={false}
            onRequestClose={onClose}
            title={title || ''}
            footer={footer}
            wrapProps={{ onTouchStart: this.onWrapTouchStart }}
          >
            {this.props.children}
          </Modal>
        </KeyboardAwareScrollView>
      )
    );
  }

  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  };
}

const closest = (el, selector) => {
  const matchesSelector = el.matches
    || el.webkitMatchesSelector
    || el.mozMatchesSelector
    || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
};
