/*
 * @Author: wangtao
 * @Date: 2022-04-19 21:29:44
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-29 09:48:08
 * @Description: file content
 */
import { takeEvery, put, delay } from "redux-saga/effects";
import { increment, increment_async } from "../actions/basic.actions";

// takeEvery 接收 action
// put 触发 action
function* handleCount(action) {
  // 相当于异步请求
  yield delay(2000);

  yield put(increment(action.payload));
}

export default function* basicSaga() {
  yield takeEvery(increment_async, handleCount);
}
