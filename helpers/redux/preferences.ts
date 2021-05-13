import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface PreferencesState {
  currentTrameId: string | undefined
}

const initialPreferenceState: PreferencesState = {
  currentTrameId: undefined,
}

const preferenceSlice = createSlice({
  name: "preferences",
  initialState: initialPreferenceState,
  reducers: {
    setCurrentTrameId: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        currentTrameId: action.payload,
      }
    },
  },
})

export const preferencesActions = preferenceSlice.actions
export const preferencesReducer = preferenceSlice.reducer
