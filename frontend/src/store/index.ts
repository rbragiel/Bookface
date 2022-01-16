import { configureStore } from "@reduxjs/toolkit";
import language from "./i18n";
import auth from "./auth";
import searchbar from "./searchbar";
import postCreate from "./post";
import { api } from "./api";
import { setupListeners } from "@reduxjs/toolkit/query/react";

const store = configureStore({
  reducer: {
    language,
    auth,
    searchbar,
    postCreate,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

setupListeners(store.dispatch);
