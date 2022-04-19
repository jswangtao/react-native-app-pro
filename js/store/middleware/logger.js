/*
 * @Author: wangtao
 * @Date: 2022-04-20 00:06:49
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-20 00:11:18
 * @Description: file content
 */
export default store => next => action => {
  console.log("🚀🚀🚀wimi======>>>redux store", store.getState());
  console.log("🚀🚀🚀wimi======>>>redux action", action);
  next(action);
};
