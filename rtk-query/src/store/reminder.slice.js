import { createSlice, createSelector } from "@reduxjs/toolkit";
import api from "../services/reminder.service";

const reminderSlice = createSlice({
    name: "reminder",
    initialState: {
        tagShowing: "",
        items: [],
    },
    reducers: {
        filterBy: (state, action) => {
            state.tagShowing = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            api.endpoints.getReminders.matchFulfilled,
            (state, action) => {
                state.items = action.payload.reminders;
            }
        );

        builder.addMatcher(
            api.endpoints.addReminder.matchFulfilled,
            (state, action) => {
                state.items.push(action.payload);
            }
        );

        builder.addMatcher(
            api.endpoints.deleteReminder.matchFulfilled,
            (state, action) => {
                state.items = state.items.filter(
                    (item) => item.id !== action.meta.arg.originalArgs
                );
            }
        );
    },
});

export default reminderSlice.reducer;

// reminder actions
export const { filterBy } = reminderSlice.actions;

// reminder selectors
export const selectReminders = (state) => {
    // Mỗi endpoint bao gồm một số tiện ích khác
    // Bao gồm action matching có thể thêm vào reducer
    // https://redux-toolkit.js.org/rtk-query/api/created-api/endpoints
    if (state.reminders.tagShowing !== "") {
        return state.reminders.items.filter(
            (item) => item.tag === state.reminders.tagShowing
        );
    } else {
        return state.reminders.items;
    }
};

export const selectTagShowing = (state) => state.reminders.tagShowing;
