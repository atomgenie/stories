import { createEnum } from "@helpers/iots/enum"
import * as t from "io-ts"

import { STORY_KINDS } from "./kinds"

const RTrameOptional = t.partial({
  description: t.string,
  picture: t.string,
  fullname: t.string,
  story: t.string,
})

export const RTrame = t.intersection([
  t.type({
    kind: createEnum(STORY_KINDS.TRAME),
    id: t.string,
    title: t.string,
  }),
  RTrameOptional,
])

export type Trame = t.TypeOf<typeof RTrame>
