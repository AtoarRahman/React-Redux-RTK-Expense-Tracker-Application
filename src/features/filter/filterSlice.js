const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    tags: [],
    tSearch: "",
    tType:"",
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        tagSelected: (state, action) => {
            state.tags.push(action.payload);
        },
        tagSelecteRemoved: (state, action) => {
            state.tags = [];
        },
        tagRemoved: (state, action) => {
            const indexToRemove = state.tags.indexOf(action.payload);

            if (indexToRemove !== -1) {
                state.tags.splice(indexToRemove, 1);
            }
        },
        searched: (state, action) => {
            state.tSearch = action.payload;
        },
        searchRemoved: (state, action) => {
            state.tSearch = "";
        },
        typeSelected: (state, action) => {
            state.tType = action.payload;
        },
        typeRemoved: (state, action) => {
            state.tType = "";
        }
    },
});

export default filterSlice.reducer;
export const { tagSelected, tagSelecteRemoved, tagRemoved, searched, searchRemoved, typeSelected, typeRemoved } = filterSlice.actions;
