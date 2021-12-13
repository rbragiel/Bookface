import { configureStore } from "@reduxjs/toolkit";
import language from "./i18n";

const store = configureStore({
  reducer: {
    language,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
