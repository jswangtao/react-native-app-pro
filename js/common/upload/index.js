/*
 * @Author: wangtao
 * @Date: 2021-03-05 11:47:17
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-01-26 11:59:54
 * @Description: 仿elementUI upload
 */
import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity, NativeModules, PixelRatio } from "react-native";
import {
  fontColorDeepGray,
  fontColorSecDeepGray,
  mainBgColorWhite,
  px2dp,
  splitLineColorLightGray,
  isAndroid
} from "@/styles";
import { uploadImage, uploadVideo } from "@/config";
import baseConfig from "@/config/baseConfig";
import { iconVideoGray, iconCameraGray } from "@/images";
import msg from "../msg";
import DefaultImg from "./img/p1.png";
import CameraCoffee from "./img/camera_coffee.png";
import TypeModel from "./type-model";
import noop from "../noop";

const { fileUrl } = baseConfig;
// 已上传张数
let uploadedCount = 0;
export default class Upload extends React.Component {
  static defaultProps = {
    action: "upload?dirName=app", // 必选参数，上传的地址 请修改dirName
    fileList: [], // 文件列表
    limit: null, // 上传文件上限
    selectType: "", // 上传文件类型
    title: "", // 上传标题
    icon: "", // 上传icon
    addImgStyle: {}, // 上传图标样式
    titleStyle: {}, // 上传标题样式
    onTouchImage: noop, // 点击图片
    onTouchAdd: noop // 点击加号
  };

  constructor(props) {
    super(props);
    this.state = {
      fileList: props.fileList || [], /// / 文件列表
      isShowTypeSelect: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.fileList.length !== prevState.fileList.length) {
      return {
        fileList: nextProps.fileList
      };
    }
    return null;
  }

  render() {
    const { style } = this.props;
    const { isShowTypeSelect } = this.state;
    return (
      <View style={[styles.container, style]}>
        {/* 已上传 */}
        {this._renderFileList()}
        {/* 上传 */}
        {this._renderAdd()}
        {isShowTypeSelect && (
          <TypeModel
            onChange={this._onChange}
            selectImg={type => {
              this._onChange("isShowTypeSelect", false);
              if (isAndroid) {
                this.selectImg(type);
              } else {
                // 如果是iOS必须延迟，等关闭上一个模态框才能打开下一个
                setTimeout(() => {
                  this.selectImg(type);
                }, 1000);
              }
            }}
          />
        )}
      </View>
    );
  }

  // 渲染列表
  _renderFileList = () => {
    const { fileList, type, onTouchImage, itemStyle } = this.props;
    console.log('fileList', fileList);
    return fileList.map((item, index) => {
      console.log("🚀🚀🚀wimi======>>>item.imageBase64", item.imageBase64);
      return (
        <TouchableOpacity
          onPress={() => {
            onTouchImage && onTouchImage(item);
          }}
          key={index}
        >
          <View style={[styles.addWrap, itemStyle]}>
            <Image
              resizeMode="stretch"
              style={styles.itemImg}
              source={{
                uri: item.imageBase64 ? `data:image/jpeg;base64,${item.imageBase64}` : fileUrl + item.fileId
                // uri: `data:image/jpeg;base64,${item.imageBase64}`
              }}
            />

            {type !== "view" && (
              <TouchableOpacity
                style={styles.deleteDescWrap}
                activeOpacity={0.8}
                onPress={() => {
                  this._onRemove(index);
                }}
              >
                <Text style={styles.deleteDesc}>删除</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      );
    });
  };

  // 渲染添加
  _renderAdd = () => {
    const { fileList, limit, itemStyle, title, addImgStyle, titleStyle } = this.props;
    if (limit && fileList.length < limit) {
      return (
        <TouchableOpacity
          onPress={() => {
            this.beforeSelect();
          }}
          opacity={0.8}
          style={[styles.addWrap, itemStyle]}
        >
          <Image resizeMode="stretch" style={[styles.addImg, addImgStyle]} source={this._renderIcon()} />
          {!!title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
        </TouchableOpacity>
      );
    }
    if (!limit) {
      return (
        <TouchableOpacity
          onPress={() => {
            this.beforeSelect();
          }}
          opacity={0.8}
          style={[styles.addWrap, itemStyle]}
        >
          <Image resizeMode="stretch" style={[styles.addImg, addImgStyle]} source={this._renderIcon()} />
          {!!title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
        </TouchableOpacity>
      );
    }
  };

  _renderIcon = () => {
    const { icon } = this.props;
    if (icon === "video") {
      return iconVideoGray;
    }
    if (icon === "camera") {
      return iconCameraGray;
    }
    if (icon === "cameraCoffee") {
      return CameraCoffee;
    }
    return DefaultImg;
  };

  beforeSelect = () => {
    const { selectType, onTouchAdd } = this.props;
    onTouchAdd && onTouchAdd();
    // 如果需要选择类型
    if (selectType === "beSelect") {
      this._onChange("isShowTypeSelect", true);
    } else {
      this.selectImg(selectType);
    }
  };

  // 选择照片
  selectImg = selectType => {
    const { routerFrom, limit } = this.props;
    const { fileList } = this.state;
    // 初始化计数
    uploadedCount = 0;
    if (selectType === "image") {
      // if (nums > 1) {
      NativeModules.DataModule.chooseImageMulit(limit - fileList.length, imgListJson => {
        console.log("🚀🚀🚀wimi======>>>imgListJson", imgListJson);
        let imgList = JSON.parse(imgListJson);

        imgList.forEach(item => {
          this._uploadImage(item.path, item.base64, imgList.length);
        });
      });
      // } else {
      //   NativeModules.DataModule.chooseImage((path, imageBase64) => {
      //     console.log('🚀🚀🚀wimi======>>>res1,res2', path, imageBase64);
      //     this._uploadImage(path, imageBase64);
      //   });
      // }
    } else if (selectType === "WatermarkCamera") {
      msg.emit("router: goToNext", {
        routeName: "WatermarkCamera",
        routerFrom: routerFrom || "",
        imgsLength: limit - fileList.length
      });
    } else if (selectType === "video") {
      NativeModules.DataModule.chooseVideo((path, imageBase64, mimeName) => {
        console.log("🚀🚀🚀wimi======>>>path, imageBase64, mimeName", path, imageBase64, mimeName);
        this._uploadVideo(path, imageBase64);
      });
    } else {
      NativeModules.DataModule.chooseImageOrVideo((path, imageBase64, resType, mimeName) => {
        console.log("🚀🚀🚀chooseImageOrVideo======>>>path, resType, mimeName", path, resType, mimeName);
        // path:本机资源路径
        // imageBase64：图片的base64，视频的一帧 ，
        // resType:图片为undifined,视频video,
        // mineName:图片为undifined,视频为格式mp4
        if (resType === "video") {
          this._uploadVideo(path, imageBase64, mimeName);
        } else {
          this._uploadImage(path, imageBase64);
        }
      });
    }
  };

  // 上传照片
  _uploadImage = (path, imageBase64, selectedImgsCount = 1) => {
    msg.emit("app:selfTip", { isVisible: true, text: "正在上传中...", icon: "loading" });
    // 计数器，多张上传
    let { onChange, action } = this.props;
    let { fileList } = this.state;
    uploadImage(action, path)
      .then(res => {
        // 请求成功
        if (res.success) {
          uploadedCount++;
          if (uploadedCount >= selectedImgsCount) {
            msg.emit("app:selfTip", { isVisible: false, text: "", icon: "" });
          }
          const { localId, localFileName } = res.data;
          fileList.push({
            name: localFileName,
            fileId: localId,
            resType: "image",
            imageBase64
          });
          this.setState({ fileList }, () => {
            console.log("🚀🚀🚀wimi======>>>fileList", fileList);
          });
          onChange(fileList);
        } else {
          msg.emit("app:tip", { text: res.msg });
          msg.emit("app:selfTip", { isVisible: false, text: "", icon: "" });
        }
      })
      .catch(err => {
        // 请求失败
        // msg.emit('app:tip', { text: '上传出错，请重试' });
        msg.emit("app:selfTip", { isVisible: false, text: "", icon: "" });
      })
      .finally(() => {
        // msg.emit('app:selfTip', { isVisible: false, text: '', icon: '' });
      });
  };

  // 上传视频
  _uploadVideo = (path, imageBase64, mimeName) => {
    msg.emit("app:selfTip", {
      isVisible: true,
      text: "正在上传中...",
      icon: "loading"
    });
    let { onChange, action } = this.props;
    let { fileList } = this.state;
    uploadVideo(action, mimeName, path)
      .then(res => {
        // 请求成功
        if (res.success) {
          const { localId, localFileName } = res.data;
          fileList.push({
            name: localFileName,
            fileId: localId,
            resType: "video",
            imageBase64
          });
          this.setState({ fileList }, () => {
            console.log("🚀🚀🚀wimi======>>>fileList", fileList);
          });
          onChange(fileList);
        } else {
          msg.emit("app:tip", { text: res.msg });
        }
      })
      .catch(err => {
        // 请求失败
        msg.emit("app:tip", { text: "上传出错，请重试" });
      })
      .finally(() => {
        msg.emit("app:selfTip", { isVisible: false, text: "", icon: "" });
      });
  };

  _onRemove = index => {
    let { onChange } = this.props;
    let { fileList } = this.state;
    fileList.splice(index, 1);
    this.setState({ fileList });
    onChange(fileList);
  };

  _onChange = (key, val) => {
    this.setState({ [key]: val });
  };
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // backgroundColor:'pink',
    flexDirection: "row",
    flexWrap: "wrap"
  },
  addWrap: {
    width: px2dp(160),
    height: px2dp(160),
    borderColor: splitLineColorLightGray,
    borderWidth: 1 / PixelRatio.get(),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: px2dp(8),
    overflow: "hidden",
    backgroundColor: "#F5F5F5"
  },

  addImg: {
    width: px2dp(40),
    height: px2dp(40)
  },
  addDesc: {
    fontSize: px2dp(24),
    color: fontColorDeepGray
  },
  addSubDesc: {
    fontSize: px2dp(22),
    color: fontColorSecDeepGray
  },

  itemImg: {
    width: "100%",
    height: "100%"
  },
  deleteDescWrap: {
    width: "100%",
    height: px2dp(44),
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  deleteDesc: {
    fontSize: px2dp(24),
    color: mainBgColorWhite
  },
  title: {
    fontSize: px2dp(24),
    color: fontColorSecDeepGray
  }
});
