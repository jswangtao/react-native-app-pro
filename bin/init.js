/*
 * @Author: wangtao
 * @Date: 2022-04-12 22:39:28
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-05-07 18:25:59
 * @Description: file content
 */
const path = require("path");
const fs = require("fs");

// 1. 复制iconfont到Android下
copyFile(
  path.resolve("assets/iconfont/iconfont.ttf"),
  path.resolve("android/app/src/main/assets/fonts/iconfont.ttf"),
  "binary"
);
// 2. 复制iconfont到iOS下
copyFile(path.resolve("assets/iconfont/iconfont.ttf"), path.resolve("ios/helloworld/Fonts/iconfont.ttf"), "binary");
// 3.自动生成iconfont对应json
autoIconFont();

// 复制文件
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

// 自动生成iconfont对应json
function autoIconFont() {
  const data = fs.readFileSync(path.resolve("assets/iconfont/iconfont.json"), "utf-8");

  const glyphs = JSON.parse(data).glyphs;
  let result = {};
  glyphs.forEach(e => {
    result[e.name] = e.unicode_decimal;
  });
  fs.writeFileSync(path.resolve("js/common/icons/iconfont.json"), JSON.stringify(result));
  console.log("🚀🚀🚀wimi======>>>导入iconfont.json成功");
}
