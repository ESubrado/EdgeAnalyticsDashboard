import { configureStore } from "@reduxjs/toolkit";
import aboutDeveloperReducer from "./slices/sliceAboutDeveloper";
import dataReducer from "./slices/sliceGraph"

export const store = configureStore({
    reducer: {
        aboutDeveloper: aboutDeveloperReducer,
        data: dataReducer
    }
});

// Types for TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



