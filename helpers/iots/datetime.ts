import * as t from "io-ts"
import dayjs, { Dayjs } from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat)

// DD/MM/YYYY hh:mm
type Datetime = string

const validDatetime = /^[0-9]+\/[0-9]+\/[0-9]+ [0-9]+:[0-9]+$/

export const datetime = new t.Type<Datetime, Dayjs, unknown>(
  "datetime",
  (input: unknown): input is Datetime =>
    typeof input === "string" && validDatetime.test(input),
  (input, context): any =>
    typeof input === "string" && validDatetime.test(input)
      ? t.success(input)
      : t.failure(input, context),
  input => dayjs(input, "D/M/YYYY h:m"),
)
