/*
 * @Author: wangtao
 * @Date: 2022-04-28 22:06:46
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-30 10:17:38
 * @Description: file content
 */
import { handleActions as createReducer } from "redux-actions";
import { user_base_info } from "../actions/user.actions";

const initialState = { userBaseInfo: {} };

const setUserBase = (state, action) => {
  console.log("🚀🚀🚀wimi======>>>state, action", state, action);
  return { userBaseInfo: action.payload };
};

export default createReducer(
  {
    [user_base_info]: setUserBase
  },
  initialState
);
