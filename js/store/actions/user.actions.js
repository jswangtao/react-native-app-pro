/*
 * @Author: wangtao
 * @Date: 2022-04-29 09:36:08
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-30 11:49:18
 * @Description: file content
 */
import { createAction } from "redux-actions";

export const login_async = createAction("login_async");

export const user_base_info = createAction("user_base_info");

export const user_init = createAction("user_init");
export const user_init_async = createAction("user_init_async");
