import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query/react";
import api from "../services/base.service";
import reminderReducer from "./reminder.slice";
import tagReducer from "./tag.slice";

const store = configureStore({
    // Reducer và middleware được tạo tự động
    reducer: {
        [api.reducerPath]: api.reducer,
        reminders: reminderReducer,
        tags: tagReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

// Thêm tùy chọn này nếu muốn thêm các hành vi như refetchOnMount và refetchOnReconnect
setupListeners(store.dispatch);

export default store;
