import { configureStore } from "@reduxjs/toolkit"
import { storiesReducer } from "./stories"
import { configReducer } from "./config"

export const store = configureStore({
  reducer: {
    stories: storiesReducer,
    config: configReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
