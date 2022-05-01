import { configureStore } from "@reduxjs/toolkit";
import { api } from "../services/api";
import projectSlice from "../slices/projectSlice";
import solanaSlice from "../slices/solanaSlice";
import wsSlice from "../slices/wsSlice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    [api.reducerPath]: api.reducer,
    project: projectSlice,
    solana: solanaSlice,
    ws: wsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
