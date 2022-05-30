/*
 * @Author: wangtao
 * @Date: 2022-04-10 17:38:30
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-05-30 23:17:33
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
  getConfigValue(data) {
    return axiosApi({
      method: "get",
      url: "basicdata-api/system/getConfigValue",
      data
    });
  }
};
