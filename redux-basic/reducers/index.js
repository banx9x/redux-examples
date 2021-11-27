import { combineReducers } from "redux";
import { counterReducer } from "./counterSlice.js";
import { todoReducer } from "./todoSlice.js";

export const reducer = combineReducers({
    counter: counterReducer,
    todo: todoReducer,
});
