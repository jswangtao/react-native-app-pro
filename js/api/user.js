/*
 * @Author: wangtao
 * @Date: 2022-04-10 17:38:30
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-06-07 14:43:45
 * @Description: file content
 */
import axiosApi from "./AxiosApi.js";

export default {
  login(data) {
    return axiosApi({
      method: "post",
      url: "passport-app-api/smsLogin",
      data
    });
  },
  getUserInfo(data) {
    return axiosApi({
      method: "get",
      url: "user-app-api/api/v1/user/getUserInfo",
      data
    });
  },
  getConfigValue(data) {
    return axiosApi({
      method: "get",
      url: "basicdata-api/system/getConfigValue",
      data
    });
  }
};
