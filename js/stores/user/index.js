/*
 * @Author: wangtao
 * @Date: 2022-03-30 15:18:15
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-12 17:19:23
 * @Description: file content
 */
import { makeAutoObservable, runInAction } from "mobx";
import api from "@/api";
import { msg, AsyncStorage, cache } from "@/common";

class UserStore {
  tokenId = ""; //tokenId
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }
  // 设置tokenId
  setTokenId(tokenId = "") {
    tokenId = tokenId || "";
    this.tokenId = tokenId;
  }
}

export default UserStore;
