import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { type TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";

import UserReducer from "./slices/UserSlice";
import RoomReducer from "./slices/RoomSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage: storage,
  whitelist: ["user", "room"], 
};

const rootReducer = combineReducers({
  user: UserReducer,
  room: RoomReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: false,
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export typed hooks that can be used throughout the app
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

// For backwards compatibility (if you have existing imports)
export default store;