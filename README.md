<!--
 * @Author: wangtao
 * @Date: 2022-04-12 17:33:47
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-06-12 23:32:26
 * @Description: file content
-->

### react-native-app-pro

- react-native 快速业务框架

### 依赖环境

官网 0.68 版本依赖的基础环境，值得注意的是 jdk 要 11 以上
[其他环境参考 0.68 版本的官网](https://reactnative.dev/docs/environment-setup)
jdk v11.0.13 必须 11 以上
node v16.13.1 建议 16 以上
npm v8.1.2 建议 8 以上

### 启动项目

1. 下载依赖

```
npm i
cd ios && pod install
```

2. ios 启动

```
react-native run-ios
如果报错打开xcode看详细报错，一般都是环境不匹配等问题
```

3. 安卓启动

```
react-native run-android
如果报错
error Failed to install the app. Make sure you have the Android development environment
打开Android Studio编译一下
```

4. 项目的分支说明

```
master 从react-navigation-4.x合并，(后续可能不会更新)
test   自己测试的分支，用来研究新的东西
react-navigation-4.x  业务框架 (目前主要更新分支)
react-navigation-4.x-mobx 业务框架 (目前主要更新分支)
react-navigation-4.x-redux 业务框架 (目前主要更新分支)
react-navigation-4.x-redux-immutable 业务框架 (目前主要更新分支)
```

5. 如果想基于本仓库快速生成自己的业务框架项目，自定义项目名，修改相关项目名称，请用仓库[@jswangtao/react-native-cli](https://github.com/jswangtao/react-native-cli),可以快速生成自己的 react-native 业务框架项目，并使用到本项目的基础代码

6. 仓库集成了 Eslint + Prettier + Husky + Commitlint+ Lint-staged 代码提交规范
   git 提交代码请执行

```
git add .
npm run commit
```
