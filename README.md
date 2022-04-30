<!--
 * @Author: wangtao
 * @Date: 2022-04-12 17:33:47
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-30 15:20:13
 * @Description: file content
-->

### react-native-app-pro

- react-native 快速业务框架

### 依赖环境

官网 0.68 版本依赖的基础环境，值得注意的是 jdk 要 11 以上
[其他环境参考 0.68 版本的官网](https://reactnative.dev/docs/environment-setup)
node v14.18.2 建议 14 以上
jdk v11.0.13 必须 11 以上

### 启动项目

1. 下载依赖

```
yarn
cd ios && pod install
```

2. 复制 iconfont，因为用了字体图标
   将 js/common/icons/iconfont 里面的 iconfont.ttf 文件复制到 node_modules/react-native-vector-icons/Fonts 文件夹下面,
   后续更换自己的字体图标库，请看 js/common/icons/README.md

   或者直接执行

   ```
   npm run init
   ```

   这个命令会帮你复制 iconfont.ttf

3. 启动

```
react-native run-android或者react-native run-ios
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
