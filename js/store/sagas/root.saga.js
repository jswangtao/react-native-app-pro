/*
 * @Author: wangtao
 * @Date: 2022-04-19 18:22:50
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-19 22:21:58
 * @Description: file content
 */
import { all } from "redux-saga/effects";
import basicSaga from "./basic.saga";

export default function* rootSaga() {
  yield all([basicSaga()]);
}
