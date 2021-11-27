import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTask, selectStatus } from "./slices/todo.slice";

export default () => {
    const dispatch = useDispatch();
    const status = useSelector(selectStatus);
    const [task, setTask] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (status.adding) return;

        const trimmed = task.trim();

        if (trimmed)
            dispatch(createTask({ title: trimmed })).then(() => setTask(""));
    };

    return (
        <form action="" onSubmit={handleSubmit}>
            <input
                disabled={status.adding}
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />

            <button disabled={status.adding} type="submit">
                {status.adding ? "Adding..." : "Add"}
            </button>
        </form>
    );
};
