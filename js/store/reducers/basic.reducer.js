/*
 * @Author: wangtao
 * @Date: 2022-04-19 18:41:26
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-19 23:34:06
 * @Description: file content
 */
import { handleActions as createReducer } from "redux-actions";
import { increment } from "../actions/basic.actions";

const initialState = { count: 1 };

const handleIncrement = (state, action) => {
  return { count: state.count + action.payload };
};

export default createReducer(
  {
    [increment]: handleIncrement
  },
  initialState
);
