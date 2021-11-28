import { useSelector, useDispatch } from "react-redux";
import { selectProgress } from "../slices/todo.slice";
import { deleteTask } from "../slices/todo.slice";
import styled from "styled-components";
import Button from "./Button";

const Li = styled.li`
    background-color: #f2f2f2;
    color: #000000;
    border-radius: 4px;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 15px;
`;

const TodoItem = ({ task }) => {
    const dispatch = useDispatch();
    const inProgress = useSelector(selectProgress);
    const isInProgress = inProgress.includes(task.id);

    return (
        <Li>
            {task.title}

            <Button
                onClick={() => dispatch(deleteTask({ id: task.id }))}
                disabled={isInProgress}
            >
                Delete
            </Button>
        </Li>
    );
};

export default TodoItem;
