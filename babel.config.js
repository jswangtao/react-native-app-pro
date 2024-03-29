/*
 * @Author: wangtao
 * @Date: 2022-04-08 23:21:03
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-06-08 15:57:06
 * @Description: file content
 */
module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    "react-native-reanimated/plugin",
    [
      "module-resolver",
      {
        root: ["./"], //表示哪个目录开始设置绝对路径
        alias: {
          //别名的配置
          "@/common": "./js/common",
          "@/styles": "./js/styles",
          "@/images": "./js/images",
          "@/api": "./js/api"
        }
      }
    ]
  ]
};
