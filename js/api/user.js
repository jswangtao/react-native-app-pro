/*
 * @Author: wangtao
 * @Date: 2022-04-10 17:38:30
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-05-26 11:22:31
 * @Description: file content
 */
import axiosApi from "./AxiosApi.js";

const apiList = {
  login: {
    method: "post",
    url: "passport-app-api/smsLogin"
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
  getConfigValue(data) {
    return axiosApi({
      ...apiList.getConfigValue,
      data
    });
  }
};
