import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counter.slice";
import cartReducer from "./slices/cart.slice";
import todoReducer from "./slices/todo.slice";
import logger from "./middlewares/logger.middleware";
import lol from "./enhencers/lol.enhencer";

const store = configureStore({
    reducer: {
        counter: counterReducer,
        cart: cartReducer,
        todo: todoReducer,
    },
    // thêm middleware
    // một hàm nhận vào getDefaultMiddleware, đã tích hợp sẵn redux-thunk và re-select
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    // ngoài ra có thêm devtool mặc định là true
    // nếu là một object thì có thể thêm các options
    // tham khảo tại đây: https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md#windowdevtoolsextensionconfig
    devTools: {},
    // preloadedState, state mặc định
    // thường mỗi slice sẽ có state riêng ròi
    preloadedState: {},
    // và enhencers
    enhancers: (defaultEnhencers) => [lol, ...defaultEnhencers],
});

export default store;
