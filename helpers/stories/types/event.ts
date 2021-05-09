import { createEnum } from "@helpers/iots/enum"
import * as t from "io-ts"

import { STORY_KINDS } from "./kinds"

export const REvent = t.type({
  kind: createEnum(STORY_KINDS.EVENT),
  id: t.string,
})

export type Event = t.TypeOf<typeof REvent>
