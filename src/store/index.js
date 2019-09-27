import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import middleware from "./middleware";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));


sagaMiddleware.run(rootSaga);

export default store;
