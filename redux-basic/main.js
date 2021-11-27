import { store, selectTodos, selectCount } from "./store";
import { countUp, countDown } from "./actions/counter";
import { addTodo, removeTodo } from "./actions/todo";

// Counter
const count = document.getElementById("count");
const btnUp = document.getElementById("count-up");
const btnDown = document.getElementById("count-down");

const onCountChange = () => (count.textContent = selectCount());
btnUp.onclick = () => store.dispatch(countUp());
btnDown.onclick = () => store.dispatch(countDown());
store.subscribe(onCountChange);

// Todo
const form = document.getElementById("todo-form");
const todo = document.getElementById("todo");
const list = document.getElementById("todo-list");

const createTodo = (todo) => {
    const li = document.createElement("li");
    li.className = "todo-item";

    const btnDel = document.createElement("button");
    btnDel.textContent = "Delete";
    btnDel.onclick = () => store.dispatch(removeTodo(todo.id));

    li.append(todo.title, btnDel);
    return li;
};

const onTodoChange = () => {
    const todos = selectTodos().map(createTodo);

    list.innerHTML = "";
    list.append(...todos);
};

form.onsubmit = (e) => {
    e.preventDefault();
    const task = todo.value.trim();

    if (task) {
        store.dispatch(addTodo(todo.value));
        todo.value = "";
    }
};

store.subscribe(onTodoChange);
