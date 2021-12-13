import { createSlice } from "@reduxjs/toolkit";
import baseApi from "../services/base.service";

const tagSlice = createSlice({
    name: "tag",
    initialState: [],
    reducers: {},
    extraReducers: (builder) =>
        builder.addMatcher(
            baseApi.endpoints.getReminders.matchFulfilled,
            (state, action) => action.payload.tags
        ),
});

export default tagSlice.reducer;

// tag selectors
export const selectTags = (state) => state.tags;
