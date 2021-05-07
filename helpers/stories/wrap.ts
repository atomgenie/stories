import { importStories } from "./utils/import-stories"
import { loadStory } from "./utils/load-story"
import { chunk } from "lodash"
import { Stories } from "./types"
import { RScene, Scene } from "./types/scene"
import { RTimeline, Timeline } from "./types/timeline"
import { verifyIds } from "./utils/verify-ids"

interface WrapStoriesReturnType {
  scenes: ReadonlyArray<Scene>
  timelines: ReadonlyArray<Timeline>
}

export const wrapStories = async (): Promise<WrapStoriesReturnType> => {
  const stories = await importStories()

  let loadedStories: ReadonlyArray<unknown> = []
  const chunkedStories = chunk(stories, 5)

  for (const chunkStories of chunkedStories) {
    const chunkLoadedStories = await Promise.all(chunkStories.map(loadStory))
    loadedStories = [...loadedStories, ...chunkLoadedStories]
  }

  const scenes = loadedStories.filter(RScene.is)
  const timelines = loadedStories.filter(RTimeline.is)

  verifyIds(scenes)
  verifyIds(timelines)

  return {
    scenes,
    timelines,
  }
}
