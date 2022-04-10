/*
 * @Author: wangtao
 * @Date: 2020-10-10 18:10:25
 * @LastEditors: 汪滔
 * @LastEditTime: 2020-10-10 18:12:11
 * @Description: file content
 */
import {
  fetchGet, fetchPostUrl,
} from './AxiosApi';
// 用户管理
export default {
  // 获取角色列表
  getUserInfo(params) {
    return fetchGet('user-api/api/v1/user/getUserInfo', params);
  },
  // 登录
  smsLogin(params) {
    return fetchPostUrl('user-api/api/v1/login/smsLogin', params);
  },
  requireSmsCode(params) {
    return fetchPostUrl('user-api/api/v1/login/requireSmsCode', params);
  },

};
