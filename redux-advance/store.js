import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { todoReducer } from "./reducers/reducer";
import logger from "./enhancers/enhancers";
import thunk from "redux-thunk";

export const store = createStore(
    todoReducer,
    composeWithDevTools(applyMiddleware(thunk), logger)
);
