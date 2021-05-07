import { createEnum } from "@helpers/iots/enum"
import * as t from "io-ts"

import { STORY_KINDS } from "./kinds"

export const RScene = t.type({
  kind: createEnum(STORY_KINDS.SCENE),
  id: t.string,
})

export type Scene = t.TypeOf<typeof RScene>
