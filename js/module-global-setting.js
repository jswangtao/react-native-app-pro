/*
 * @Author: wangtao
 * @Date: 2022-06-06 11:04:07
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-06-06 11:20:06
 * @Description: file content
 */
import { TouchableOpacity, Image } from "react-native";

export default function () {
  TouchableOpacity.defaultProps = {
    ...TouchableOpacity.defaultProps,
    activeOpacity: 0.8
  };

  Image.defaultProps = {
    ...Image.defaultProps,
    resizeMode: "contain"
  };
}
