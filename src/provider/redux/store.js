import { configureStore } from "@reduxjs/toolkit";
import { AuthDetails } from "./features/AuthDetails";

export const store = configureStore({
    reducer: {
        'AuthDetails': AuthDetails.reducer
    },
});