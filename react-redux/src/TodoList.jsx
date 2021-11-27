import { useSelector } from "react-redux";
import { selectTasks, selectStatus, selectError } from "./slices/todo.slice";
import TodoItem from "./TodoItem";

export default () => {
    const status = useSelector(selectStatus);
    const error = useSelector(selectError);
    const tasks = useSelector(selectTasks);

    if (status.loading) return <p>Loading...</p>;

    if (error) return <p>{error}</p>;

    return (
        <ul>
            {tasks.map((task) => (
                <TodoItem key={task.id} task={task} />
            ))}
        </ul>
    );
};
