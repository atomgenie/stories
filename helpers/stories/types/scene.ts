import { createEnum } from "@helpers/iots/enum"
import * as t from "io-ts"

import { STORY_KINDS } from "./kinds"

const RScenePartial = t.partial({
  description: t.string,
})

export const RScene = t.intersection([
  t.type({
    kind: createEnum(STORY_KINDS.SCENE),
    id: t.string,
    title: t.string,
    trames: t.array(t.string),
  }),
  RScenePartial,
])

export type Scene = t.TypeOf<typeof RScene>
