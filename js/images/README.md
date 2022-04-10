<!--
 * @Author: wangtao
 * @Date: 2022-02-19 20:21:59
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-02-19 20:26:59
 * @Description: file content
-->

### 图片文件夹

- 建议就保持两个文件夹

  - icons 图标文件 命名规则 `icon_名称_颜色` `icon_home_gray.png`
  - drawable 其他图片 命名规则 按功能命名，类似 Android 的 drawable

- 自动生成图片文件

```
npm run images
```

在 js 文件中引用

```
import { iconHomeCoffee, iconHomeGray } from '@/images';
```
