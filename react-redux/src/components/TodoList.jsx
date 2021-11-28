import { useSelector } from "react-redux";
import { selectTasks, selectStatus, selectError } from "../slices/todo.slice";
import TodoItem from "./TodoItem";
import styled from "styled-components";

const Ul = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 15px;
`;

const TodoList = () => {
    const status = useSelector(selectStatus);
    const error = useSelector(selectError);
    const tasks = useSelector(selectTasks);

    if (status.loading || tasks.length == 0) return null;

    if (error) return <p>{error}</p>;

    return (
        <Ul>
            {tasks.map((task) => (
                <TodoItem key={task.id} task={task} />
            ))}
        </Ul>
    );
};

export default TodoList;
