import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getTasks = createAsyncThunk("todo/get", (_, { rejectWithValue }) => {
    return axios
        .get("/api/todos")
        .then((res) => res.data.todos)
        .catch((err) => rejectWithValue(err.response.data));
});

const createTask = createAsyncThunk(
    "todo/create",
    ({ title }, { rejectWithValue }) => {
        return axios
            .post("/api/todos", { title })
            .then((res) => res.data.todo)
            .catch((err) => rejectWithValue(err.response.data));
    }
);

const deleteTask = createAsyncThunk(
    "todo/delete",
    ({ id }, { rejectWithValue }) => {
        return axios
            .delete("/api/todos/" + id)
            .then((res) => res.data)
            .catch((err) => rejectWithValue(err.response.data));
    }
);

const clear = createAsyncThunk("todo/clear", (_, { rejectWithValue }) => {
    return axios
        .delete("/api/todos")
        .then((res) => res.data)
        .catch((err) => rejectWithValue(err.reponse.data));
});

const todoSlice = createSlice({
    name: "todo",
    initialState: {
        status: {
            loading: false,
            adding: false,
        },
        error: null,
        inProgress: [],
        tasks: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTasks.pending, (state, action) => {
                state.status.loading = true;
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.status.loading = false;
                state.tasks = action.payload;
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.status.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(createTask.pending, (state, action) => {
                state.status.adding = true;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.status.adding = false;
                state.tasks.push(action.payload);
            })
            .addCase(createTask.rejected, (state, action) => {
                state.status.adding = false;
                state.error = action.payload;
            });

        builder
            .addCase(deleteTask.pending, (state, action) => {
                state.inProgress.push(action.meta.arg.id);
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(
                    (t) => t.id != action.meta.arg.id
                );
                state.inProgress = state.inProgress.filter(
                    (p) => p != action.meta.arg.id
                );
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.error = action.payload;
                state.inProgress = state.inProgress.filter(
                    (p) => p != action.meta.arg.id
                );
            });

        builder
            .addCase(clear.pending, (state, action) => {
                state.status.loading = true;
            })
            .addCase(clear.fulfilled, (state) => {
                state.status.loading = false;
                state.tasks = [];
            })
            .addCase(clear.rejected, (state, action) => {
                state.status.loading = false;
                state.error = action.payload;
            });
    },
});

export default todoSlice.reducer;
export { getTasks, createTask, deleteTask, clear };

export const selectTotal = (state) => state.todo.tasks.length;
export const selectTasks = (state) => state.todo.tasks;
export const selectStatus = (state) => state.todo.status;
export const selectError = (state) => state.todo.error;
export const selectProgress = (state) => state.todo.inProgress;
