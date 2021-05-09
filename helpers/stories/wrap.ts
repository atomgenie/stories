import { importStories } from "./utils/import-stories"
import { loadStory } from "./utils/load-story"
import { chunk } from "lodash"
import { RScene, Scene } from "./types/scene"
import { REvent, Event } from "./types/event"
import { verifyIds } from "./utils/verify-ids"
import { RTrame, Trame } from "./types/trame"

interface WrapStoriesReturnType {
  scenes: ReadonlyArray<Scene>
  events: ReadonlyArray<Event>
  trames: ReadonlyArray<Trame>
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
  const events = loadedStories.filter(REvent.is)
  const trames = loadedStories.filter(RTrame.is)

  verifyIds(scenes)
  verifyIds(events)
  verifyIds(trames)

  return {
    scenes,
    events,
    trames,
  }
}
