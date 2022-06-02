/*
 * @Author: wangtao
 * @Date: 2022-04-26 14:07:06
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-06-02 16:12:59
 * @Description: file content
 */
import XMButton from "./button"; // 自定义Button
import XMSendCodeButton from "./button-code-send"; // 发送验证码
import msg from "./msg"; // 全局通信
import BackImageOn from "./back-image-on"; // 返回按钮(主要与XMHeader配合使用，自带宽高，方便点击)
import * as _ from "./util"; // 工具函数
import cache from "./cache"; // 常量模块
import Toast from "./toast"; // toast弹框
import ValidConst from "./validate"; // 常用校验正则
import XMImage from "./image"; // 图片组件
import XMImageViewer from "./image-viewer"; //图片预览
import XMImageAlbum from "./image-album"; //图片预览
import XMListView from "./list-view"; // 列表组件
import XMEmpty from "./empty"; // 缺省图
import XMLoading from "./loading"; // 缺省图
import XMHeader from "./header"; // 内嵌头部
import XMSafeAreaView from "./safe-area-view"; //沉浸式安全区
import XMIcon from "./icons"; //字体图标
import XMInput from "./input"; //输入框
import FormInput from "./form/form-input"; // 表单输入
import FormSelect from "./form/form-select"; // 表单选择
import FormItem from "./form/form-item"; // 表单普通展示项目
import Overlay from "./overlay"; // 模态框
import XMModal from "./modal"; // 模态框
export {
  XMButton,
  XMSendCodeButton,
  msg,
  BackImageOn,
  _,
  cache,
  Toast,
  ValidConst,
  XMImage,
  XMImageViewer,
  XMImageAlbum,
  XMListView,
  XMEmpty,
  XMLoading,
  XMHeader,
  FormInput,
  FormSelect,
  FormItem,
  XMSafeAreaView,
  XMIcon,
  Overlay,
  XMModal,
  XMInput
};
