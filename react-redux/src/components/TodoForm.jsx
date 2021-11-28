import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTask, selectStatus } from "../slices/todo.slice";
import Button from "./Button";
import TextField from "./TextField";
import FormField from "./FormField";
import styled from "styled-components";

const Form = styled.form`
    width: 100%;
    margin-bottom: 30px;
`;

const TodoForm = () => {
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
        <Form action="" onSubmit={handleSubmit}>
            <FormField>
                <TextField
                    placeholder="Add new task"
                    value={task}
                    disabled={status.adding}
                    onChange={(e) => setTask(e.target.value)}
                />

                <Button disabled={status.adding} primary>
                    Add
                </Button>
            </FormField>
        </Form>
    );
};

export default TodoForm;
