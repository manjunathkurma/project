import { configureStore } from '@reduxjs/toolkit'
import { hospApi } from '../services/hospitalApi'
import { setupListeners } from '@reduxjs/toolkit/query'
export const store = configureStore({
  reducer: {
  
    [hospApi.reducerPath]: hospApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hospApi.middleware),
})

setupListeners(store.dispatch)