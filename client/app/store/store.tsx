import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slices/sliceGraph"

export const store = configureStore({
    reducer: {
        data: dataReducer
    }
});

// Types for TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



