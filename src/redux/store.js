import {
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
} from "redux-persist";

import authSlice from "./authSlice";
import projectSlice from "./projectSlice";
import taskSlice from "./taskSlice";

// CUSTOM STORAGE
const customStorage = {
  getItem: (key) => {
    return Promise.resolve(
      localStorage.getItem(key)
    );
  },

  setItem: (key, value) => {
    localStorage.setItem(
      key,
      value
    );

    return Promise.resolve(true);
  },

  removeItem: (key) => {
    localStorage.removeItem(key);

    return Promise.resolve();
  },
};

const persistConfig = {
  key: "root",

  storage: customStorage,

  whitelist: ["auth"],
};

const rootReducer =
  combineReducers({
    auth: authSlice,
    project: projectSlice,
    task: taskSlice,
  });

const persistedReducer =
  persistReducer(
    persistConfig,
    rootReducer
  );

export const store =
  configureStore({
    reducer: persistedReducer,

    middleware: (
      getDefaultMiddleware
    ) =>
      getDefaultMiddleware({
        serializableCheck:
          false,
      }),
  });

export const persistor =
  persistStore(store);