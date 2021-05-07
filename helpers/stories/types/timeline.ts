import { createEnum } from "@helpers/iots/enum"
import * as t from "io-ts"

import { STORY_KINDS } from "./kinds"

export const RTimeline = t.type({
  kind: createEnum(STORY_KINDS.TIMELINE),
  id: t.string,
})

export type Timeline = t.TypeOf<typeof RTimeline>
