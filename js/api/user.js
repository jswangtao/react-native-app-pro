/*
 * @Author: wangtao
 * @Date: 2022-04-10 17:38:30
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-30 14:18:06
 * @Description: file content
 */
import axiosApi from "./AxiosApi.js";

const apiList = {
  login: {
    method: "post",
    url: "passport-app-api/smsLogin"
  },
  getUserInfo: {
    method: "get",
    url: "user-app-api/api/v1/user/getUserInfo"
  },
  getConfigValue: {
    method: "get",
    url: "basicdata-api/system/getConfigValue"
  }
};

export default {
  login(data) {
    return axiosApi({
      ...apiList.login,
      data
    });
  },
  getUserInfo(data) {
    return axiosApi({
      ...apiList.getUserInfo,
      data
    });
  },
  getConfigValue(data) {
    return axiosApi({
      ...apiList.getConfigValue,
      data
    });
  }
};
