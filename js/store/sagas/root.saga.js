/*
 * @Author: wangtao
 * @Date: 2022-04-19 18:22:50
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-29 09:52:35
 * @Description: file content
 */
import { all } from "redux-saga/effects";
import basicSaga from "./basic.saga";
import userSaga from "./user.saga";

export default function* rootSaga() {
  yield all([basicSaga(), userSaga()]);
}
