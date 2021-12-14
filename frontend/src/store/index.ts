import { configureStore } from "@reduxjs/toolkit";
import language from "./i18n";
import auth from "./auth";

const store = configureStore({
  reducer: {
    language,
    auth,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
