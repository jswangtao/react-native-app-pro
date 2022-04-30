/*
 * @Author: wangtao
 * @Date: 2022-04-29 09:48:09
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-30 12:02:00
 * @Description: file content
 */
import { takeEvery, put } from "redux-saga/effects";
import { user_base_info, login_async, user_init_async, user_init } from "../actions/user.actions";
import api from "@/api";
import { AsyncStorage, cache, msg } from "@/common";

function* login(action) {
  // 登录
  const res = yield api.user.login(action.payload);
  AsyncStorage.setItem(cache.TOKEN_ID, res.data);

  const info = yield api.user.getUserInfo();

  AsyncStorage.setItem(cache.USER_BASE_INFO, info.data);
  yield put(user_base_info(info.data));
  msg.emit("router:reset", {
    routeName: "Tab"
  });
}

function* userInit() {
  const info = yield AsyncStorage.getItem(cache.USER_BASE_INFO);
  yield put(user_init(info));
}

export default function* userSaga() {
  yield takeEvery(login_async, login);
  yield takeEvery(user_init_async, userInit);
}
