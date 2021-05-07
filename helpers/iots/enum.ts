import * as t from "io-ts"

export const createEnum = <T extends string>(entry: T) => {
  return new t.Type<T, string, unknown>(
    entry,
    (input: unknown): input is T => input === entry,
    (input, context): any =>
      typeof input === "string" && input === entry
        ? t.success(input)
        : t.failure(input, context),
    output => output,
  )
}
