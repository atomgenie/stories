import { RScene } from "./scene"
import { REvent } from "./event"

import * as t from "io-ts"
import { RTrame } from "./trame"

export const RStories = t.union([RScene, REvent, RTrame])

export type Stories = t.TypeOf<typeof RStories>
