import { useSelector, useDispatch } from "react-redux";
import { selectProgress } from "./slices/todo.slice";
import { completeTask, deleteTask } from "./slices/todo.slice";

export default ({ task }) => {
    const dispatch = useDispatch();
    const inProgress = useSelector(selectProgress);
    const isInProgress = inProgress.includes(task.id);

    return (
        <li>
            {task.title}

            <button
                onClick={() =>
                    task.completed
                        ? dispatch(deleteTask({ id: task.id }))
                        : dispatch(completeTask({ id: task.id }))
                }
                disabled={isInProgress}
            >
                {isInProgress
                    ? task.completed
                        ? "Deleting..."
                        : "Completing..."
                    : task.completed
                    ? "Delete"
                    : "Complete"}
            </button>
        </li>
    );
};
