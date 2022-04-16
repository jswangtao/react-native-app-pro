/*
 * @Author: wangtao
 * @Date: 2022-04-11 09:54:34
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-14 23:16:04
 * @Description: file content
 */
import createIconSet from "react-native-vector-icons/lib/create-icon-set";
import glyphMap from "./iconfont.json";
// glyphMap, fontFamily, fontFile三个参数，注意看react-native-vector-icons官方文档中方法注释，
// Android中fontFamily可以随便写，iOS必须是正确的名字否则运行报错，iOS可以直接双击iconfont.ttf打开看字体实际叫什么名字
const iconSet = createIconSet(glyphMap, "iconfont", "iconfont.ttf");

export default iconSet;
