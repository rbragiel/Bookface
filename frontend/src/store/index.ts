import { configureStore } from "@reduxjs/toolkit";
import language from "./i18n";
import auth from "./auth";
import searchbar from "./searchbar";
import { friendsApi } from "./friends";

const store = configureStore({
  reducer: {
    language,
    auth,
    searchbar,
    [friendsApi.reducerPath]: friendsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(friendsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
