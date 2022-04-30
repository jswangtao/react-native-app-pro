/*
 * @Author: wangtao
 * @Date: 2022-04-19 18:15:34
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-30 11:54:24
 * @Description: file content
 */
import { combineReducers } from "redux";
import basicReducer from "./basic.reducer";
import userReducer from "./user.reducer";

// { basic: {},user:{ userBaseInfo:{} } }
export default combineReducers({
  basic: basicReducer,
  user: userReducer
});
