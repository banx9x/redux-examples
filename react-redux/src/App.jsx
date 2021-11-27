import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTasks } from "./slices/todo.slice";
import Form from "./Form";
import TodoList from "./TodoList";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTasks());
    }, []);

    return (
        <div>
            <h1>React Redux example</h1>

            <Form />

            <TodoList />
        </div>
    );
};

export default App;
