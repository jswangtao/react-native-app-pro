/*
 * @Author: wangtao
 * @Date: 2021-12-24 11:37:25
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-06-14 18:19:01
 * @Description: Subsection 分段器
 *  Subsection标签的切换，需要绑定current值，在change事件回调中可以得到index，将其赋值给current即可。
    具体的标签，通过list参数配置，该参数要求为数组，元素为对象，对象要有name属性，见示例：
 */
import { color_primary } from "@/styles/theme";
import React from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Animated, Easing, Dimensions } from "react-native";

import { px2dp } from "../../styles";
const noop = () => {};

export default class Subsection extends React.Component {
  static defaultProps = {
    list: [{ name: "全部" }],
    duration: 200, // 移动定时 单位ms
    current: 0, // 当前选中标签的索引
    buttonColor: "#fff", //滑块颜色
    subsectionColor: color_primary, //滑块颜色
    buttonHeight: px2dp(70), //滑块高度
    activeStyle: { color: "#000", fontWeight: "bold" }, //菜单选择中时的样式
    inactiveStyle: { color: "#444", lineHeight: px2dp(80) }, //菜单非选中时的样式
    style: {}, //菜单容器的样式
    itemStyle: {}, //菜单item的样式
    onClick: noop, //点击标签时触发  item: 传入的其他值 index: 标签索引值
    onChange: noop, //标签索引改变时触发  item: 传入的其他值 index: 标签索引值
    mode: "button"
  };

  constructor(props) {
    super(props);
    this.state = {
      firstTime: true, // 是否第一次进入
      innerCurrent: props.current || 0 // 选中的的元素位置
    };
    // 动画目前的位置
    this.spinValue = new Animated.Value(0);
  }

  componentDidMount() {
    setTimeout(() => {
      // 初始化测量总长和每个元素的长度
      this.resize();
    }, 0);
  }

  render() {
    const { list, buttonColor, subsectionColor, buttonHeight, activeStyle, inactiveStyle, style, itemStyle, mode } =
      this.props;
    const { innerCurrent } = this.state;
    return (
      <View
        style={[
          styles.container,
          mode === "button" && { paddingHorizontal: 4 },
          style,
          mode !== "button" && {
            borderRadius: 8,
            borderWidth: 1,
            borderColor: subsectionColor
          }
        ]}
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          ref={el => (this.scrollRef = el)}
        >
          <View style={styles.navWrap} ref={el => (this.navWrap = el)}>
            <View
              style={[
                styles.navScrollWrap,
                mode === "button" && {
                  paddingVertical: (inactiveStyle.lineHeight - buttonHeight) / 2
                }
              ]}
            >
              <Animated.View
                style={[
                  styles.navLine,
                  { transform: [{ translateX: this.spinValue }] },
                  {
                    width: `${100 / list.length}%`,
                    backgroundColor: mode === "button" ? buttonColor : subsectionColor,
                    height: mode === "button" ? buttonHeight : inactiveStyle.lineHeight,
                    borderRadius: mode === "button" ? 8 : 0
                  }
                ]}
              />
            </View>
            {list.map((item, index) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.navItem,
                    itemStyle,
                    { flex: 1 },
                    mode !== "button" && {
                      borderColor: index === 0 ? 0 : subsectionColor,
                      borderLeftWidth: 1
                    }
                  ]}
                  ref={el => (this[`navItem${index}`] = el)}
                  key={index}
                  activeOpacity={1}
                  onPress={() => {
                    this.clickHandler(item, index);
                  }}
                >
                  <Text
                    style={[
                      styles.navTxt,
                      inactiveStyle,
                      innerCurrent === index && activeStyle,
                      innerCurrent === index && mode !== "button" && { color: "#fff" },
                      item.disabled && { color: "#c8c9cc" }
                    ]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }

  // 点击某一个标签
  clickHandler = (item, index) => {
    const { onClick, onChange } = this.props;
    // 因为标签可能为disabled状态，所以click是一定会发出的，但是change事件是需要可用的状态才发出
    onClick(item, index);

    // 如果disabled状态，返回
    if (item.disabled) return;
    this.setState({ innerCurrent: index });
    setTimeout(() => {
      this.resize();
    }, 0);
    onChange(item, index);
  };

  // 获取所有标签的尺寸
  resize = () => {
    const { list } = this.props;
    // 如果不存在list，则不处理
    if (list.length === 0) {
      return;
    }
    Promise.all([this.getTabsRect(), this.getAllItemRect()]).then(([tabsRect, itemRect = []]) => {
      this.tabsRect = tabsRect;
      this.scrollViewWidth = 0;
      itemRect.map((item, index) => {
        // 计算scroll-view的宽度，这里
        this.scrollViewWidth += item.width;
        // 另外计算每一个item的中心点X轴坐标
        list[index].rect = item;
      });
      // 获取了tabs的尺寸之后，设置滑块的位置
      this.setLineLeft();
      this.setScrollLeft();
    });
  };

  setLineLeft = () => {
    const { innerCurrent, firstTime } = this.state;
    const { list, duration } = this.props;
    const tabItem = list[innerCurrent];
    if (!tabItem) {
      return;
    }
    // 获取滑块该移动的位置
    let lineOffsetLeft = list.slice(0, innerCurrent).reduce((total, curr) => total + curr.rect.width, 0);
    this.lineOffsetLeft = lineOffsetLeft;

    // 第一次移动滑块，无需过渡时间
    this.animation(this.lineOffsetLeft, firstTime ? 0 : parseInt(duration));

    // 如果是第一次执行此方法，让滑块在初始化时，瞬间滑动到第一个tab item的中间
    // 这里需要一个定时器，是直接通过style绑定过渡时间，需要等其过渡完成后，再设置为false(非第一次移动滑块)
    if (firstTime) {
      this.setState({ firstTime: false });
    }
  };

  // 设置滑块的位置
  animation = (x, duration = 0) => {
    Animated.timing(this.spinValue, {
      toValue: x,
      duration: duration,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => {
      // console.log('🚀🚀🚀wimi======>>>Animated stop',);
    });
  };

  setScrollLeft = () => {
    const { innerCurrent } = this.state;
    const { list } = this.props;
    // 当前活动tab的布局信息，有tab菜单的width和left(为元素左边界到父元素左边界的距离)等信息
    const tabRect = list[innerCurrent];
    // 累加得到当前item到左边的距离
    const offsetLeft = list.slice(0, innerCurrent).reduce((total, curr) => {
      return total + curr.rect.width;
    }, 0);
    // 此处为屏幕宽度
    const { width: windowWidth } = Dimensions.get("window");
    // 将活动的tabs-item移动到屏幕正中间，实际上是对scroll-view的移动
    let scrollLeft = offsetLeft - (windowWidth - tabRect.rect.width) / 2;

    this.scrollRef.scrollTo({ x: scrollLeft, y: 0, animated: true });
  };

  // 获取导航菜单的尺寸
  getTabsRect = () => {
    return new Promise(resolve => {
      this.queryRect(this.navWrap).then(size => resolve(size));
    });
  };

  // 获取所有标签的尺寸
  getAllItemRect = () => {
    const { list } = this.props;
    return new Promise(resolve => {
      const promiseAllArr = list.map((item, index) => this.queryRect(this[`navItem${index}`]));
      Promise.all(promiseAllArr).then(sizes => {
        return resolve(sizes);
      });
    });
  };

  // 获取各个标签的尺寸
  queryRect = ref => {
    // 获取组件对象
    const handle = ref;
    return new Promise(resolve => {
      // 测量尺寸
      handle.measure((x, y, width, height, pageX, pageY) => {
        resolve({
          x,
          y,
          width,
          height,
          pageX,
          pageY
        });
      });
    });
  };
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#F5F5F5",
    overflow: "hidden"
  },
  scrollContainer: {
    flex: 1
  },
  navWrap: {
    width: "100%",
    // height: px2dp(80),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  navItem: {
    paddingHorizontal: px2dp(30)
  },
  navTxt: {
    fontSize: px2dp(28),
    lineHeight: px2dp(80),
    textAlign: "center"
  },
  navLine: {
    flex: 1
  },
  navScrollWrap: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
  }
});
