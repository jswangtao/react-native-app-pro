/*
 * @Author: wangtao
 * @Date: 2022-04-12 22:39:28
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-12 22:59:46
 * @Description: file content
 */
const path = require("path");
const fs = require("fs");
function copyFile(srcPath, destPath, format) {
  // 二进制格式不能用utf8
  // let format = binaryExtensions.indexOf(path.extname(srcPath)) !== -1 ? "binary" : "utf8";
  fs.readFile(srcPath, format, function (err, data) {
    if (err) {
      return console.log(err);
    }

    fs.writeFile(destPath, data, format, function (err) {
      if (err) return console.log(err);
    });
  });
}
copyFile(
  path.resolve("js/common/icons/iconfont/iconfont.ttf"),
  path.resolve("node_modules/react-native-vector-icons/Fonts/iconfont.ttf"),
  "binary"
);
