import { configureStore } from "@reduxjs/toolkit";
import language from "./i18n";
import auth from "./auth";
import { invitationsApi } from "./invitations";
import { friendsApi } from "./friends";

const store = configureStore({
  reducer: {
    language,
    auth,
    [invitationsApi.reducerPath]: invitationsApi.reducer,
    [friendsApi.reducerPath]: friendsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(invitationsApi.middleware)
      .concat(friendsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
