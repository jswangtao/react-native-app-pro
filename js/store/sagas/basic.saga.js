/*
 * @Author: wangtao
 * @Date: 2022-04-19 21:29:44
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-19 23:37:19
 * @Description: file content
 */
import { takeEvery, put, delay } from "redux-saga/effects";
import { increment, increment_async } from "../actions/basic.actions";

function* handleCount(action) {
  yield delay(2000);
  yield put(increment(action.payload));
}

export default function* basicSaga() {
  yield takeEvery(increment_async, handleCount);
}
