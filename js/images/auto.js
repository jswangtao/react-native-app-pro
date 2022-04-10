/*
 * @Author: wangtao
 * @Date: 2022-01-12 15:10:47
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-02-19 20:19:33
 * @Description: 自动导入图片(目前支持drawable/icons文件夹，下划线命名,比如：icon_company_yellow，common_header_bg)
 */
// 导入模块
const fs = require("fs/promises");

const pathName = "./js/images"; // 需遍历的文件夹路径
const dirNames = ["drawable", "icons"]; // 需遍历的文件夹路径
const jsPath = "./js/images/index.js"; // 生成 json 的文件路径
const preFixReg = /^[a-z]\w+$/; //小写字母开头，包含字母数字下划线

// 打开/创建文件并写入 JSON
function writeJS(file, data) {
  // 异步写入（但 await 改为了同步，所以错误回调不需要了）
  fs.writeFile(file, data);
}

// 下划线改驼峰
function changeHump(name) {
  let arr = name.split("");
  arr.map((item, index) => {
    if (item === "_") {
      arr.splice(index, 1);
      arr[index] = arr[index].toUpperCase();
    }
  });
  return arr.join("");
}

// 过滤不规范命名的图片
function filterImgs(arr, reg, key) {
  return arr.filter(item => {
    if (reg.test(item[key])) {
      return item;
    }
  });
}
// async/await 将异步改为了同步写法
const autoImportImages = async () => {
  try {
    const dirs = await fs.readdir(pathName);
    let code = "";
    let codeObj = "";
    for (let i = 0; i < dirs.length; i++) {
      // 只遍历指定文件夹
      if (dirNames.includes(dirs[i])) {
        let promiseArr = [];
        // 得到每个原材料的 promise 对象组成的数组【注意map回调需要加async关键字】
        promiseArr = (await fs.readdir(`${pathName}/${dirs[i]}`)).map(async file => {
          // 文件名
          const fileName = file;
          // 提取文件前缀名
          const prefix = file.substring(0, file.lastIndexOf("."));
          const prefixHump = changeHump(prefix);
          // 提取文件扩展名
          const extension = file.substring(file.lastIndexOf(".") + 1, file.length);

          // 返回需要的数据对象
          return {
            prefix, // 前缀名
            prefixHump, // 驼峰前缀名
            extension, // 扩展名
            fileName // 文件名
          };
        });
        // 通过 Promise.all 将所有 promise 转为真正的数组
        let lists = await Promise.all(promiseArr);
        // 原始前缀只能包含数字字母下划线
        lists = filterImgs(lists, preFixReg, "prefix");

        for (let j = 0; j < lists.length; j++) {
          codeObj[lists[j].prefixHump];
          code += `import ${lists[j].prefixHump} from "./${dirs[i]}/${lists[j].fileName}";\r\n`;
          codeObj += `${lists[j].prefixHump},\r\n`;
        }
      }
    }
    code += `\r\nexport {\r\n${codeObj}}`;

    // 生成 js文件
    await writeJS(jsPath, code);

    // 已为同步操作，所以若通畅无阻，即成功
    console.log("🚀🚀🚀wimi======>>>images自动导入成功！！！");
  } catch (err) {
    console.error(err);
  }
};
autoImportImages();
// export default autoImportImages;
