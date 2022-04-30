/*
 * @Author: kanglang
 * @Date: 2020-11-24 13:25:37
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-30 14:18:59
 * @Description: 异步存储方法
 * 未回调方法 调用时需要async await
 */
import AsyncStorage from "@react-native-community/async-storage";
import msg from "./msg";
import cache from "./cache";

export default {
  // 存储字符串
  setItem: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      msg.emit("app:tip", { text: "保存失败" });
    }
  },
  // 获取字符串
  getItem: async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      return JSON.parse(value);
    } catch (e) {
      msg.emit("app:tip", { text: "取值失败" });
    }
  },
  // 获取字符串(多项)
  multiGetItem: async (keys = []) => {
    try {
      const res = await AsyncStorage.multiGet(keys);
      let result = {};
      res.forEach(item => {
        result[item[0]] = JSON.parse(item[1]);
      });
      return result;
    } catch (e) {
      msg.emit("app:tip", { text: "取值失败" });
    }
  },
  // 清除回调
  removeItem: async key => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.log(e);
    }
  },
  // 清除回调(多项)
  multiRemoveItem: async (keys = []) => {
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (e) {
      console.log(e);
    }
  },
  // 用户信息抛异常，清理掉上次用户的信息
  clearUserStorage: () => {
    try {
      AsyncStorage.removeItem(cache.TOKEN_ID);
      AsyncStorage.removeItem(cache.USER_BASE_INFO);
      AsyncStorage.removeItem(cache.ROLE_LIST);
      AsyncStorage.removeItem(cache.ROLE);
      AsyncStorage.removeItem(cache.ENTERPRISE_INFO);
    } catch (e) {
      console.log(e);
    }
  }
};
