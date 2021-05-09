import { Scene } from "@helpers/stories/types/scene"
import { Event } from "@helpers/stories/types/event"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Trame } from "@helpers/stories/types/trame"

interface StoriesState {
  scenes: ReadonlyArray<Scene>
  events: ReadonlyArray<Event>
  trames: ReadonlyArray<Trame>
}

const initialStories: StoriesState = {
  scenes: [],
  events: [],
  trames: [],
}

const storiesSlice = createSlice({
  name: "stories",
  initialState: initialStories,
  reducers: {
    load: (state, stories: PayloadAction<StoriesState>) => ({
      ...state,
      ...stories.payload,
    }),
  },
})

export const storiesActions = storiesSlice.actions
export const storiesReducer = storiesSlice.reducer
