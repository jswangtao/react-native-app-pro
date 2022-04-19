/*
 * @Author: wangtao
 * @Date: 2022-04-19 18:10:09
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-20 00:08:39
 * @Description: file content
 */
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/root.reducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/root.saga";
import logger from "./middleware/logger";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(logger, sagaMiddleware));

sagaMiddleware.run(rootSaga);
