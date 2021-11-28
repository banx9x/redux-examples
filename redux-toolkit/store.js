import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counter.slice";
import cartReducer from "./slices/cart.slice";
import todoReducer from "./slices/todo.slice";
import logger from "./middlewares/logger.middleware";
import amazing from "./enhencers/amazing.enhencer";

// Cấu hình store với configureStore
// Đã bao gồm sẵn dev tools, redux-thunk, re-select, ...
const store = configureStore({
    reducer: {
        counter: counterReducer,
        cart: cartReducer,
        todo: todoReducer,
    },
    // Thêm middleware
    // Một hàm callback nhận vào getDefaultMiddleware
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    // Ngoài ra có thêm devtool mặc định là true
    // Nếu là một object thì có thể thêm các options cho dev tools
    // Tham khảo tại đây: https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md#windowdevtoolsextensionconfig
    devTools: {},
    // preloadedState là state mặc định
    // Thường mỗi slice sẽ có state riêng (initialState)
    preloadedState: {},
    // Và cuối cùng là enhencers
    enhancers: (defaultEnhencers) => [amazing, ...defaultEnhencers],
});

export default store;
