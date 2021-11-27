import { createStore } from "redux";
import { reducer } from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(reducer, composeWithDevTools());

export const selectCount = () => store.getState().counter.count;
export const selectTodos = () => store.getState().todo.todos;
