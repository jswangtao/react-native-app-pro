/*
 * @Author: wangtao
 * @Date: 2022-04-28 22:06:46
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-30 12:12:38
 * @Description: file content
 */
import { handleActions as createReducer } from "redux-actions";
import { user_base_info, user_init } from "../actions/user.actions";
import { fromJS } from "immutable";

const initialState = fromJS({ userBaseInfo: {} });

const setUserBase = (state, action) => {
  return fromJS({ userBaseInfo: action.payload });
};

const setUserInit = (state, action) => {
  return fromJS({ userBaseInfo: action.payload });
};

export default createReducer(
  {
    [user_base_info]: setUserBase,
    [user_init]: setUserInit
  },
  initialState
);
