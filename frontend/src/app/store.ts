import { configureStore } from '@reduxjs/toolkit'
import { api } from '../services/api'
import solanaSlice from '../slices/solanaSlice'


export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    solana: solanaSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch