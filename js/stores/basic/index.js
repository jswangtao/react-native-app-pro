/*
 * @Author: wangtao
 * @Date: 2022-03-30 15:18:15
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-12 23:38:01
 * @Description: file content
 */
import { makeAutoObservable, runInAction } from "mobx";
import api from "@/api";

class BasicStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.serviceNum = ""; //客服电话
    makeAutoObservable(this);
  }

  // 获取客服电话
  getCustomService() {
    const params = {
      code: "ydxlmkfdh"
    };
    api.user.getConfigValue(params).then(res => {
      console.log("🚀🚀🚀wimi======>>>res", res);

      if (res.success) {
        const serviceNum = res.data.keys;
        console.log("🚀🚀🚀wimi======>>>serviceNum", serviceNum);
        runInAction(() => {
          this.serviceNum = serviceNum;
        });
      }
    });
  }
}

export default BasicStore;
