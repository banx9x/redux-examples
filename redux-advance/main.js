import "./server";
import { store } from "./store";
import {
    loadTaskAsync,
    addTaskAsync,
    completeTaskAsync,
    deleteTaskAsync,
} from "./actions/todoActions";

const form = document.getElementById("form");
const todo = document.getElementById("todo");
const add = document.getElementById("add");
const list = document.getElementById("todo-list");
const status = document.getElementById("status");

form.onsubmit = (e) => {
    e.preventDefault();
    if (todo.value.trim().length > 0)
        store.dispatch(addTaskAsync(todo.value.trim()));
};

const renderTodo = ({ id, title, completed }) => {
    const { completing, deleting } = store.getState();
    const isCompleting = completing === id;
    const isDeleting = deleting === id;

    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = isCompleting
        ? "Completing..."
        : isDeleting
        ? "Deleting..."
        : !completed
        ? "Complete"
        : "Delete";
    btn.onclick = !completed
        ? () => store.dispatch(completeTaskAsync(id))
        : () => store.dispatch(deleteTaskAsync(id));
    btn.disabled = isCompleting || isDeleting;

    li.append(title, btn);

    return li;
};

const render = () => {
    const { loading, error: err, todos } = store.getState();

    list.innerHTML = "";

    if (loading) status.textContent = "Loading...";
    else if (err) status.textContent = err;
    else if (todos.length === 0) status.textContent = "No task";
    else {
        status.textContent = "";
        list.append(...todos.map(renderTodo));
    }
};

const onAdding = () => {
    const { adding } = store.getState();

    if (adding) {
        todo.disabled = true;
        add.disabled = true;
        add.textContent = "Adding...";
    } else {
        todo.value = "";
        todo.disabled = false;
        add.disabled = false;
        add.textContent = "Add";
    }
};

store.subscribe(render);
store.subscribe(onAdding);
store.dispatch(loadTaskAsync());
