import { datetime } from "@helpers/iots/datetime"
import { createEnum } from "@helpers/iots/enum"
import * as t from "io-ts"

import { STORY_KINDS } from "./kinds"

export const REvent = t.type({
  kind: createEnum(STORY_KINDS.EVENT),
  id: t.string,
  title: t.string,
  date: datetime,
  scene: t.string,
})

export type Event = t.TypeOf<typeof REvent>

export const encodeEvent = (event: Event) => REvent.encode(event)
export type EEvent = ReturnType<typeof REvent.encode>
