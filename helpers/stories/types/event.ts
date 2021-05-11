import { datetime } from "@helpers/iots/datetime"
import { createEnum } from "@helpers/iots/enum"
import * as t from "io-ts"

import { STORY_KINDS } from "./kinds"

const REventLinks = t.partial({
  twitch: t.string,
  youtube: t.string,
})

export const REventPovWithTrame = t.intersection([
  t.type({
    trame: t.string,
  }),
  REventLinks,
])

export const REventPovAnonym = t.intersection([
  t.type({
    author: t.string,
  }),
  REventLinks,
])

const REventPov = t.union([REventPovWithTrame, REventPovAnonym])

export type EventPov = t.TypeOf<typeof REventPov>

export const REvent = t.type({
  kind: createEnum(STORY_KINDS.EVENT),
  id: t.string,
  title: t.string,
  date: datetime,
  scene: t.string,
  povs: t.array(REventPov),
})

export type Event = t.TypeOf<typeof REvent>

export const encodeEvent = (event: Event) => REvent.encode(event)
export type EEvent = ReturnType<typeof REvent.encode>
