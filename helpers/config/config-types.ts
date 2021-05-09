import * as t from "io-ts"

const ROptionalConfig = t.partial({
  description: t.string,
  picture: t.string,
})

const RRequiredConfig = t.type({
  title: t.string,
})

export const RConfig = t.intersection([ROptionalConfig, RRequiredConfig])

export type Config = t.TypeOf<typeof RConfig>
