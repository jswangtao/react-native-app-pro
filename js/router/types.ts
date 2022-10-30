/*
 * @Author: wangtao
 * @Date: 2022-10-30 10:20:04
 * @LastEditors: wangtao
 * @LastEditTime: 2022-10-30 14:22:44
 * @Description: file content
 */
import { ReactElement } from "react";

export interface IRoute {
  name: string;
  component: ReactElement;
  options?: {};
}

export type TRoutes = IRoute[];
