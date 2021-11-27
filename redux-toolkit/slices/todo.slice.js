import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thực hiện các thao tác bất đồng bộ với promise
const getTasks = createAsyncThunk(
    // tham số đầu tiên là tên hành động
    "todo/getTasks",
    // tham số thứ 2 là một hàm callback
    // hàm này trả về một promise
    // redux sẽ tự động tạo các action tương ứng với trạng thái của promise
    // pending -> todo/getTasks/pending
    // fulfilled -> todo/getTasks/fulfilled
    // rejected -> todo/getTasks/rejected
    // các action này có thể được xử lý với extraReducers
    // hàm nhận 2 tham số:
    // - arg: là giá trị truyền vào khi dispatch action, ví dụ dispatch(getTasks(123)) => arg = 123, nếu cần truyền nhiều giá trị, sử dụng object
    // - thunkAPI: cung cấp một số API
    // --- dispatch: store dispatch
    // --- getState: store getstate
    // --- fulfillWithValue(value, [meta])
    // --- rejectWithValue(value, [meta])
    async (_, { fulfillWithValue, rejectWithValue }) => {
        return axios
            .get("https://jsonplaceholder.typicode.com/todos")
            .then((res) => fulfillWithValue(res.data)) // hoặc đơn giản là return
            .catch((err) => rejectWithValue(err.response.data));
    }
);

const createTask = createAsyncThunk(
    "todo/createTask",
    ({ userId, title }, { rejectWithValue }) => {
        return axios
            .post("https://jsonplaceholder.typicode.com/todos", {
                userId,
                title,
            })
            .then((res) => res.data)
            .catch((err) => rejectWithValue(err.response.data));
    }
);

const todoSlice = createSlice({
    name: "todo",
    initialState: {
        status: "idle",
        error: null,
        tasks: [],
    },
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(getTasks.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.tasks = action.payload;
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(createTask.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.tasks.push(action.payload);
            })
            .addCase(createTask.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            }),
});

export default todoSlice.reducer;
export { getTasks, createTask };
