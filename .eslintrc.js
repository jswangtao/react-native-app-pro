/*
 * @Author: wangtao
 * @Date: 2021-12-31 09:10:24
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-05-30 16:01:11
 * @Description: file content
 */
module.exports = {
  // 环境定义了预定义的全局变量
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  // extends: 'airbnb-base', //上一行为不要代码格式化功能，这一行为代码格式化选择 airbnb 的格式规范。
  globals: {
    __DEV__: true
  },
  parser: "babel-eslint",
  // JavaScript 语言选项
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react"],

  rules: {
    // 这里可以设置规则：
    //"off" or 0 - 关闭规则
    //"warn" or 1 - 将规则作为警告打开（不影响退出代码）
    //"error" or 2 - 将规则作为错误打开（退出代码为1）
    eqeqeq: "error", //开启全等校验
    "no-console": "off",
    "react/prop-types": 0, //关闭必须在props中声明
    // 配置方法编码顺序start
    "react/sort-comp": [
      1,
      {
        order: ["static-methods", "lifecycle", "/^on.+$/", "rendering", "everything-else"],
        groups: {
          rendering: ["/^render.+$/", "render"]
        }
      }
    ]
  }
};
