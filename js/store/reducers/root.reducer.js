/*
 * @Author: wangtao
 * @Date: 2022-04-19 18:15:34
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-19 21:36:31
 * @Description: file content
 */
import { combineReducers } from "redux";
import basicReducer from "./basic.reducer";

// { basic: {}, }
export default combineReducers({
  basic: basicReducer
});
