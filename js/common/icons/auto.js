/*
 * @Author: wangtao
 * @Date: 2022-04-11 10:23:01
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-11 10:45:54
 * @Description: file content
 */
// 导入模块
const fs = require("fs");

function autoIconFont() {
  const data = fs.readFileSync("./iconfont/iconfont.json", "utf-8");

  const glyphs = JSON.parse(data).glyphs;
  let result = {};
  glyphs.forEach(e => {
    result[e.name] = e.unicode_decimal;
  });
  fs.writeFileSync("./iconfont.json", JSON.stringify(result));
  console.log("🚀🚀🚀wimi======>>>导入iconfont.json成功");
}

autoIconFont();
