/*
 * @Author: wangtao
 * @Date: 2022-03-30 15:18:15
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-30 14:50:41
 * @Description: file content
 */
import { makeAutoObservable, runInAction } from "mobx";
import api from "@/api";
import { msg, AsyncStorage, cache } from "@/common";

class UserStore {
  userBaseInfo = {}; //userBaseInfo
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  // 设置userBaseInfo
  setUserBaseInfo(userBaseInfo = {}) {
    userBaseInfo = userBaseInfo || {};
    this.userBaseInfo = userBaseInfo;
  }

  // 登录
  login(params) {
    api.user.login(params).then(res => {
      if (res.success) {
        msg.emit("router:reset", {
          routeName: "Tab"
        });
        AsyncStorage.setItem(cache.TOKEN_ID, res.data);
        this.getUserInfo();
      }
    });
  }

  // 获取基本信息
  getUserInfo() {
    api.user.getUserInfo().then(res => {
      if (res.success) {
        runInAction(() => {
          this.setUserBaseInfo(res.data);
          AsyncStorage.setItem(cache.USER_BASE_INFO, res.data);
        });
      }
    });
  }
}

export default UserStore;
