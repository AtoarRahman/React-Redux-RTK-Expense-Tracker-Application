const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    startPage: 1,
    pageLimit: 5,
};


const paginationSlice = createSlice({
    name: "paginationVideos",
    initialState,
    reducers: {
        pageNumberUpdate: (state, action) => {
            state.startPage = action.payload;
        },
        pageLimitUpdate: (state, action) => {
            state.pageLimit = action.payload;
        },
        prevPage: (state, action) => {
            state.startPage = state.startPage - 1;
        },
        nextPage: (state, action) => {
            state.startPage = state.startPage + 1;
        },
        resetPagination: (state, action) => {
            state.startPage = 1;
            state.pageLimit = 5;
        },
    },
});

export default paginationSlice.reducer;
export const { pageNumberUpdate, pageLimitUpdate, resetPagination, prevPage, nextPage } = paginationSlice.actions;
