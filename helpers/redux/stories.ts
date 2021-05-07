import { Scene } from "@helpers/stories/types/scene"
import { Timeline } from "@helpers/stories/types/timeline"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface StoriesState {
  scenes: ReadonlyArray<Scene>
  timelines: ReadonlyArray<Timeline>
}

const initialStories: StoriesState = {
  scenes: [],
  timelines: [],
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
