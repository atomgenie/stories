import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Config } from "../config/config-types"

const config: Config = {
  title: "",
  description: undefined,
}

const configSlice = createSlice({
  name: "config",
  initialState: config,
  reducers: {
    load: (state, data: PayloadAction<Config>) => ({ ...state, ...data.payload }),
  },
})

export const configAction = configSlice.actions
export const configReducer = configSlice.reducer
