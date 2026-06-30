import { configureStore } from "@reduxjs/toolkit";
import aboutDeveloperReducer from "./slices/sliceAboutDeveloper";
import type { AboutDeveloperState } from "./slices/sliceAboutDeveloper";
import dataReducer from "./slices/sliceGraph"
import type { DataState } from "./slices/sliceGraph"

const STORE_CACHE_KEY = "edgeanalytics.redux-cache";

type PersistedState = {
    aboutDeveloper: AboutDeveloperState;
    data: DataState;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === "object" && value !== null && !Array.isArray(value);

const readPersistedState = (): PersistedState | undefined => {
    if (typeof window === "undefined") {
        return undefined;
    }

    try {
        const cachedState = window.localStorage.getItem(STORE_CACHE_KEY);
        const parsedState: unknown = cachedState ? JSON.parse(cachedState) : undefined;

        if (!isRecord(parsedState)) {
            return undefined;
        }

        if (!isRecord(parsedState.aboutDeveloper) || !isRecord(parsedState.data)) {
            return undefined;
        }

        return {
            aboutDeveloper: {
                ...(parsedState.aboutDeveloper as unknown as AboutDeveloperState),
                loading: false,
                error: null,
                source: parsedState.aboutDeveloper.source === "blank" ? "blank" : "cache",
            },
            data: {
                ...(parsedState.data as unknown as DataState),
                loadingChart: false,
            },
        };
    } catch {
        return undefined;
    }
}

export const store = configureStore({
    reducer: {
        aboutDeveloper: aboutDeveloperReducer,
        data: dataReducer
    },
    preloadedState: readPersistedState(),
});

if (typeof window !== "undefined") {
    store.subscribe(() => {
        const state = store.getState();

        try {
            window.localStorage.setItem(
                STORE_CACHE_KEY,
                JSON.stringify({
                    aboutDeveloper: {
                        ...state.aboutDeveloper,
                        loading: false,
                    },
                    data: {
                        ...state.data,
                        loadingChart: false,
                    },
                }),
            );
        } catch {
            // Ignore storage quota/privacy-mode failures; live API data still works.
        }
    });
}

// Types for TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



