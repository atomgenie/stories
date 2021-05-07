import { RScene } from "./scene"
import { RTimeline } from "./timeline"
import * as t from "io-ts"

export const RStories = t.union([RScene, RTimeline])

export type Stories = t.TypeOf<typeof RStories>
