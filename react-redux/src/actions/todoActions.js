import {
    LOAD_REQUESTED,
    LOAD_DONE,
    LOAD_FAILED,
    ADD_REQUESTED,
    ADD_DONE,
    ADD_FAILED,
    COMPLETE_REQUESTED,
    COMPLETE_DONE,
    COMPLETE_FAILED,
    DELETE_REQUESTED,
    DELETE_DONE,
    DELETE_FAILED,
} from "./actionsTypes";

export const loadRequested = () => ({ type: LOAD_REQUESTED });
export const loadDone = (data) => ({ type: LOAD_DONE, payload: data });
export const loadFailed = (error) => ({ type: LOAD_FAILED, payload: error });

export const loadTaskAsync = () => (dispatch) => {
    dispatch(loadRequested());

    return fetch("/api/todos")
        .then((res) => res.json())
        .then((data) => dispatch(loadDone(data.todos)))
        .catch((error) => dispatch(loadFailed(error)));
};

export const addRequested = () => ({ type: ADD_REQUESTED });
export const addDone = (data) => ({ type: ADD_DONE, payload: data });
export const addFailed = (error) => ({ type: ADD_FAILED, payload: error });

export const addTaskAsync = (task) => (dispatch) => {
    dispatch(addRequested());

    return fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: task, completed: false }),
    })
        .then((res) => res.json())
        .then(({ todo }) => dispatch(addDone(todo)))
        .catch((error) => dispatch(addFailed(error)));
};

export const completeRequested = (data) => ({
    type: COMPLETE_REQUESTED,
    payload: data,
});
export const completeDone = (data) => ({ type: COMPLETE_DONE, payload: data });
export const completeFailed = (error) => ({
    type: COMPLETE_FAILED,
    payload: error,
});

export const completeTaskAsync = (id) => (dispatch) => {
    dispatch(completeRequested(id));

    return fetch("/api/todos/" + id, {
        method: "PATCH",
    })
        .then((res) => res.json())
        .then(() => dispatch(completeDone(id)))
        .catch((error) => dispatch(completeFailed(error)));
};

export const deleteRequested = (data) => ({
    type: DELETE_REQUESTED,
    payload: data,
});
export const deleteDone = (data) => ({ type: DELETE_DONE, payload: data });
export const deleteFailed = (error) => ({ type: DELETE_FAILED, payload: data });

export const deleteTaskAsync = (id) => (dispatch) => {
    dispatch(deleteRequested(id));

    return fetch("/api/todos/" + id, {
        method: "DELETE",
    })
        .then((res) => {
            if (res.status === 204) dispatch(deleteDone(id));
            else throw new Error(res.statusText);
        })
        .catch((error) => dispatch(deleteFailed(error)));
};
