import { authApi } from "@/features/auth/api";
import { dashboardSlice } from "@/features/dashboard/slice";
import { storeApi } from "@/features/store/api";
import { combineReducers, configureStore } from "@reduxjs/toolkit/react";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

export const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [storeApi.reducerPath]: storeApi.reducer,
  dashboard: dashboardSlice.reducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware, storeApi.middleware),
  devTools: {
    name: "Opensend",
  },
});

export const persistor = persistStore(store);
