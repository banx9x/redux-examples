import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thực hiện các thao tác bất đồng bộ với promise
const getTasks = createAsyncThunk(
    // Tham số đầu tiên là tên hành động
    "todo/getTasks",
    // Tham số thứ 2 là một hàm callback, hàm này trả về một promise
    // Redux sẽ tự động tạo các action tương ứng với trạng thái của promise
    // - pending -> todo/getTasks/pending
    // - fulfilled -> todo/getTasks/fulfilled
    // - rejected -> todo/getTasks/rejected
    // Các action này có thể được xử lý với extraReducers
    // Hàm callback này nhận 2 tham số:
    // - arg: là giá trị truyền vào khi dispatch action, ví dụ dispatch(getTasks(123)) => arg = 123
    // - thunkAPI: cung cấp một số API như dispatch, getState, fulfillWithValue, rejectWithValue, ...
    // Tham khảo thêm về thunkAPI: https://redux-toolkit.js.org/api/createAsyncThunk#payloadcreator
    async (_, { fulfillWithValue, rejectWithValue }) => {
        return (
            axios
                .get("https://jsonplaceholder.typicode.com/todos")
                // Trường hợp thành công
                .then((res) => fulfillWithValue(res.data)) // Hoặc đơn giản là return
                // Trường hợp thất bại
                .catch((err) => rejectWithValue(err.response.data))
        );
    }
);

// Tương tự như trên
const createTask = createAsyncThunk(
    "todo/createTask",
    // Truyền nhiều tham số cho arg sử dụng object
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
    // extraReducers là một hàm, nhận vào object builder
    // Thông qua builder, cho phép các reducers được khai báo bên ngoài
    // Builder có các API: addCase, addMatcher và addDefaultCase tương tự createReducer
    extraReducers: (builder) =>
        builder
            // createAsyncThunk tự động tạo các action theo trạng thái của promise
            // Thêm reducer để xử lý cho từng trạng thái
            .addCase(getTasks.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.tasks = action.payload;
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error;
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
                state.error = action.error;
            }),
});

export default todoSlice.reducer;
export { getTasks, createTask };
