import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../features/filter/filterSlice";
import paginationReducer from "../features/pagination/paginationSlice";
import transactionReducer from "../features/transaction/transactionSlice";

export const store = configureStore({
    reducer: {
        transaction: transactionReducer,
        filter: filterReducer,
        pagination: paginationReducer,
    },
});
