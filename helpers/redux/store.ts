import { configureStore } from "@reduxjs/toolkit"
import { storiesReducer } from "./stories"
import { configReducer } from "./config"
import { preferencesReducer } from "./preferences"

export const store = configureStore({
  reducer: {
    stories: storiesReducer,
    config: configReducer,
    preferences: preferencesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
