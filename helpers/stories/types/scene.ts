import { datetime } from "@helpers/iots/datetime"
import { createEnum } from "@helpers/iots/enum"
import * as t from "io-ts"

import { STORY_KINDS } from "./kinds"

const RScenePartial = t.partial({
  description: t.string,
  picture: t.string,
})

export const RScene = t.intersection([
  t.type({
    kind: createEnum(STORY_KINDS.SCENE),
    id: t.string,
    title: t.string,
    date: datetime,
    trames: t.array(t.string),
  }),
  RScenePartial,
])

export type Scene = t.TypeOf<typeof RScene>

export const encodeScene = (scene: Scene) => RScene.encode(scene)
export type EScene = ReturnType<typeof RScene.encode>
