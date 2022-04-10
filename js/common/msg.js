/*
 * @Author: wangtao
 * @Date: 2020-06-29 11:53:32
 * @LastEditors: 汪滔
 * @LastEditTime: 2020-07-11 10:29:44
 * @Description: file content
 */

Object.defineProperty(exports, '__esModule', { value: true });
/**
 * 消息中心
 * usage
 *  import {msg} from 'plume2'
 *
 *  //绑定
 *  msg.on('hello', (param) => console.log(param))
 *  //触发
 *  msg.emit('hello', 'hello')
 *  //解绑
 *  msg.off('hello')
 */
const mitt = require('mitt');

const msg = new (mitt.default || mitt)();
exports.default = msg;
