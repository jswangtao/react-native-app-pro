/*
 * @Author: wangtao
 * @Date: 2022-03-30 14:58:18
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-30 14:49:55
 * @Description: 状态管理，一般业务开发操作步骤，
 * 1.将stores下的template文件夹复制为自己的业务模块store，改名
 * 2.引入自己的模块store到此，然后实例化注册
 */
import React from "react";
import { Provider } from "mobx-react";
import { configure } from "mobx";
import { AsyncStorage, cache } from "@/common";
import { isAndroid } from "@/styles";

// 安卓所需配置
if (isAndroid) {
  configure({ useProxies: "never", enforceActions: "never" });
}

//1. 引入业务模块 start
import UserStore from "./user";
import BasicStore from "./basic";

class RootStore {
  constructor() {
    //2.实例化注册
    this.userStore = new UserStore(this);
    this.basicStore = new BasicStore(this);
  }

  // 初始化store
  initStore() {
    // 从内存中获取
    AsyncStorage.multiGetItem([cache.USER_BASE_INFO]).then(res => {
      this.userStore.setUserBaseInfo(res.user_base_info);
      console.log("🚀🚀🚀wimi======>>>setUserBaseInfo", res);
      // 客服电话全局
      this.basicStore.getCustomService();
    });
  }

  // 清理store
  clearStore() {}
}

const RootStoreProvider = ({ store, children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export { RootStore, RootStoreProvider };
