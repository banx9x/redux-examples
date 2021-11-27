import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { todoReducer } from "./reducers/reducer";
import logger from "./enhencers/logger";
import thunkFake from "./middlewares/thunk-fake";
import thunkReal from "redux-thunk";

export const store = createStore(
    todoReducer,
    composeWithDevTools(applyMiddleware(thunkFake), logger)
    // composeWithDevTools(applyMiddleware(thunkReal), logger)
);
