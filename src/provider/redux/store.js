import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthDetailsReducer from "./features/AuthDetails";
import ProfileReducer from "./features/Profile";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const isClient = typeof window !== "undefined";
let mainReducer;

if (isClient) {
    const persistConfig = {
        key: "root",
        storage: AsyncStorage,
    };

    const rootReducer = combineReducers({
        AuthDetails: AuthDetailsReducer,
        Profile: ProfileReducer,
    })

    mainReducer = persistReducer(persistConfig, rootReducer);
} else {
    mainReducer = combineReducers({
        AuthDetails: AuthDetailsReducer,
        Profile: ProfileReducer,
    });

}
export const store = configureStore({
    reducer: mainReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);