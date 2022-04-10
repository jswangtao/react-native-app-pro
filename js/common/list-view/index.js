/*
 * @Author: wangtao
 * @Date: 2020-09-04 11:05:35
 * @LastEditors: 汪滔
 * @LastEditTime: 2020-10-12 17:55:50
 * @Description: 暴力封装ListView,闲着无聊改进之前的XmList
 */

import React from 'react';
import {
  FlatList,
  View,
  RefreshControl,

} from 'react-native';

import { fromJS, is } from 'immutable';
import { fetchGet, fetchPost } from '../../api/AxiosApi';
import noop from '../noop';
import NoMore from './no-more';
import Loading from '../loading';
import IsLoading from './is-loading';

const onTop = require('./images/onTop.png');

export default class XMListView extends React.PureComponent {
  // 当前的pageNum
  _pageNum;

  // 大分页的pageNum
  _chunkPageNum;

  // 当前是不是正在获取更多的数据
  _isLoadingMore;

  static defaultProps = {
    // 请求的url
    url: '',
    // 请求方式
    methods: '',
    // 从返回对象中取数据的属性,避免在公共组件中写死这种代码context.esGoodsInfoPage.content
    dataPropsName: '',
    // 样式
    style: {},
    columnWrapperStyle: {},
    topButStyle: {},
    // http参数
    params: {},
    // 默认当前页
    pageNo: 1,
    // 默认每页展示的数量
    pageSize: 10,
    // 默认排序
    sortFlag: 0,
    // 当前的数据
    dataSource: [],
    // 是否分页
    isPagination: true,
    // 显示头部
    renderHeader: null,
    // 展示每列
    renderRow: null,
    // 展示页脚
    renderFooter: null,
    // 显示空
    renderEmpty: null,
    // 收到数据后的回调
    onDataReached: noop,
    // row数据中的主键，用于生成行key
    keyProps: 'id',
    // 多余的参数，state等变量
    extraData: {},
    // 每行的列数
    numColumns: 1,
    // 组装item需要的其他参数，和content平级的返回值
    otherProps: [],
    // 行高
    // lineHeight:121
    // 返回滑动数据
    returnScroll: null,
    // 没有更多文本
    noMoreText: '没有更多了',
  };

  constructor(props) {
    super(props);

    const { pageNo, dataSource } = this.props;
    this._pageNum = pageNo;
    this._isLoadingMore = false;
    this._chunkPageNum = 1;
    this.otherPropsObject = {};

    this.state = {
      // 是不是正在初始化
      isFirstLoading: true,
      // 当前的数据源
      dataSource: dataSource || [],
      // 数据到底
      noMore: false,
      // 当前是不是正在获取更多的数据,正在加载中
      isLoadingFlag: false,
      // 是否显示置顶按钮
      onTopButShow: false,
      // 滑动距离
      scrollTop: 0,
    };
  }

  componentDidMount() {
    this._init();
    if (this.props.toRefresh) {
      this.props.toRefresh(this._init);
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps===', nextProps);
    if (!is(fromJS(nextProps.params), fromJS(this.props.params))) {
      this._init(nextProps);
      // this.refs.listRef.scrollToItem({index:0,viewPosition:0});
      // this.listRef.scrollToOffset({ animated: false, offset: 0 });
    } else if (nextProps.dataSource && nextProps.dataSource.length > 0) {
      this.setState({
        dataSource: nextProps.dataSource,
        noMore: true,
      });
    }
  }

  // 根据滑动距离判断是否显示置顶按钮
  onScroll(event) {
    this.setState({
      onTopButShow: event.nativeEvent.contentOffset.y >= 200,
      scrollTop: event.nativeEvent.contentOffset.y,
    });
    this.props.returnScroll && this.props.returnScroll(event);
  }

  // 置顶
  onTop = () => {
    // this.listRef.scrollTo({ x: 0, y: 0, animated: true});
    this.listRef.scrollToOffset({ x: 0, y: 0, animated: true });
  };

  render() {
    const {
      numColumns,
      horizontal,
      columnWrapperStyle,
      renderHeader,
      renderRow,
      renderEmpty,
      pageSize,
      keyProps,
      extraData,
      style,
    } = this.props;
    if (this.state.isFirstLoading) {
      return <Loading />;
    }

    // 提高滚动流畅度
    // if (document.body.style.overflowY != 'hidden') {
    //   document.body.style.overflowY = 'hidden';
    // }

    // 如果数据为空
    const { dataSource, otherPropsObject } = this.state;
    if (extraData.toRefresh) {
      this._init();
    }

    const columnProps = { numColumns };
    if (numColumns > 1) {
      columnProps.columnWrapperStyle = columnWrapperStyle;
    }

    // 如果数据不为空
    return [
      <FlatList
        style={style}
        ref={(ref) => (this.listRef = ref)}
        data={dataSource}
        onScroll={() => this.onScroll}
        renderItem={({ item, index }) => renderRow(item, extraData, index, otherPropsObject)}
        keyExtractor={(item, index) => `${item[keyProps]}-${index}`}
        horizontal={horizontal}
        numColumns={numColumns}
        initialNumToRender={pageSize}
        // 0.5表示距离内容最底部的距离为当前列表可见长度的一半时触发。
        onEndReachedThreshold={0.5}
        onEndReached={this._handlePagination}
        ListFooterComponent={this._renderFooter}
        ListHeaderComponent={renderHeader && renderHeader()}
        ListEmptyComponent={
          !this.state.isFirstLoading && renderEmpty && renderEmpty()
        }
        extraData={extraData}
        // getItemLayout={(data, index) => ( {length: lineHeight, offset: lineHeight * index, index} )}
        {...columnProps}
        refreshControl={(
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => this._onRefresh()}
            tintColor="#BA914A"
            colors={['#BA914A']}
          />
        )}
      />,
      // this.state.onTopButShow && (
      //   <TouchableOpacity
      //     activeOpacity={0.8}
      //     style={[
      //       {
      //         position: 'absolute',
      //         bottom: 38,
      //         right: 12,
      //         zIndex: 10,
      //         backgroundColor: 'rgba(255,255,255,.9)',
      //         borderWidth: 3 / PixelRatio.get(),
      //         borderColor: '#e2e2e2',
      //         borderStyle: 'solid',
      //         alignItems: 'center',
      //         justifyContent: 'space-around',
      //         borderRadius: 20,
      //         height: 40,
      //         width: 40,
      //         paddingVertical: 5,
      //       },
      //       this.props.topButStyle,
      //     ]}
      //     onPress={() => this.onTop()}>
      //     <Image
      //       style={{width: 15, height: 15, tintColor: '#999'}}
      //       source={onTop}
      //     />
      //     <Text style={{fontSize: 10}}>顶部</Text>
      //   </TouchableOpacity>
      // ),
    ];
  }

  /**
   * 初始化数据
   */
  _init = async (props) => {
    // 之前设置为true 禁止加载数据的锁解开
    this._isLoadingMore = true;
    this.setState({
      noMore: false,
      refreshing: true,
      isLoadingFlag: true,
    });
    this._pageNum = 1;

    props = props || this.props;
    const { url, otherProps, methods } = props;
    if (__DEV__) console.log(props, 'props');
    // 如果url不为空，fetch去访问
    if (url !== '') {
      const res = await (methods === 'GET'
        ? fetchGet(url, this._getParams(props))
        : fetchPost(url, this._getParams(props)));
      if (__DEV__) console.log('listView', res);
      const { context } = res;
      let dataList;
      if (this.props.dataPropsName) {
        // dataPropsName若存在,则遍历属性名取嵌套的数据
        dataList = res;
        const propNmArr = this.props.dataPropsName.split('.');
        propNmArr.forEach((propNm) => {
          dataList = dataList[propNm];
        });
      } else {
        // dataPropsName若不存在,按照原有方式取值,兼容老接口
        dataList = (context
            && ((context.esGoodsInfoPage && context.esGoodsInfoPage.content)
              || context.content
              || (context.goodsInfos && context.goodsInfos.content)
              || (context.couponViews && context.couponViews.content)
              || (context.esGoodsInfoResponse
                && context.esGoodsInfoResponse.esGoodsInfoPage.content)
              || (context.couponCodeVos && context.couponCodeVos.content)
              || context.storeLocalVOList))
          || [];
      }
      const otherPropsObject = {};
      if (otherProps && otherProps.length > 0 && context) {
        otherProps.forEach((item) => {
          let propTmp = context;
          const itemPropArr = item.split('.');
          itemPropArr.forEach((propNm) => {
            propTmp = propTmp[propNm];
          });
          otherPropsObject[item] = propTmp || {};
        });
      }

      this._isLoadingMore = false;
      dataList = dataList.map((data) => {
        data._otherProps = otherPropsObject;
        return data;
      });
      this.setState(
        {
          isFirstLoading: false,
          isLoadingFlag: false,
          refreshing: false,
          dataSource: dataList,
          noMore: dataList.length < this.props.pageSize,
          otherPropsObject,
        },
        () => {
          // 通知父组件数据
          props.onDataReached && props.onDataReached(res);
        },
      );
    } else {
      this.setState({
        isLoadingFlag: false,
        isFirstLoading: false,
        refreshing: false,
        noMore: this.props.dataSource.length < this.props.pageSize,
      });
    }
  };

  _handlePagination = async () => {
    // 防止重复获取数据
    if (this._isLoadingMore) {
      return;
    }
    if (!this.props.isPagination) {
      return;
    }
    // 必须滑动大于20
    // if(this.state.scrollTop<20){
    //   return;
    // }

    this._isLoadingMore = true;
    this.setState({
      isLoadingFlag: true,
    });
    this._pageNum++;

    const { url, otherProps, methods } = this.props;

    const res = await (methods === 'GET'
      ? fetchGet(url, this._getParams())
      : fetchPost(url, this._getParams()));
    if (__DEV__) console.log('listView1', res);
    const { context } = res;
    let dataList;
    if (this.props.dataPropsName) {
      // dataPropsName若存在,则遍历属性名取嵌套的数据
      dataList = res;
      const propNmArr = this.props.dataPropsName.split('.');
      propNmArr.forEach((propNm) => {
        dataList = dataList[propNm];
      });
    } else {
      // dataPropsName若不存在,按照原有方式取值,兼容老接口
      dataList = (context
          && ((context.esGoodsInfoPage && context.esGoodsInfoPage.content)
            || context.content
            || (context.goodsInfos && context.goodsInfos.content)
            || (context.couponViews && context.couponViews.content)
            || (context.esGoodsInfoResponse
              && context.esGoodsInfoResponse.esGoodsInfoPage.content)
            || (context.couponCodeVos && context.couponCodeVos.content)))
        || [];
    }

    const otherPropsObject = {};
    if (otherProps && otherProps.length > 0 && context) {
      otherProps.forEach((item) => {
        let propTmp = context;
        const itemPropArr = item.split('.');
        itemPropArr.forEach((propNm) => {
          propTmp = propTmp[propNm];
        });
        otherPropsObject[item] = propTmp || {};
      });
    }

    if (!res || dataList.length === 0) {
      // show error
      this._pageNum--;
      this.setState({
        noMore: true,
      });
      return;
    }

    this._isLoadingMore = false;
    this.setState({
      isLoadingFlag: false,
    });
    dataList = dataList.map((data) => {
      data._otherProps = otherPropsObject;
      return data;
    });
    this.setState(
      (state) => ({
        // dataSource: [...this.state.dataSource, ...dataList],
        dataSource: state.dataSource.concat(dataList),
        noMore: dataList.length < this.props.pageSize,
        otherPropsObject: fromJS(state.otherPropsObject)
          .mergeDeep(fromJS(otherPropsObject))
          .toJS(),
      }),
      () => {
        this.props.onDataReached && this.props.onDataReached(res);
      },
    );
  };

  /**
   * 获取参数
   */
  _getParams(props) {
    const { pageSize, params } = props || this.props;
    console.log('🚀🚀🚀wimi======>>>pageSize', pageSize, params, this.props);

    return {
      ...params,
      pageNo: this._pageNum,
      pageSize,
      // webFlag: true
    };
  }

  /**
   * 没有更多了提示
   */
  _renderFooter = () => (
    <View>
      {this.props.renderFooter ? this.props.renderFooter() : null}
      {this.state.isLoadingFlag && !this.state.noMore && <IsLoading />}
      {this.state.noMore && this.state.dataSource.length > 0 ? (
        <NoMore text={this.props.noMoreText ? this.props.noMoreText : '没有更多了'} />
      ) : null}
    </View>
  );

  _onRefresh() {
    this._init(this.props);
  }
}
