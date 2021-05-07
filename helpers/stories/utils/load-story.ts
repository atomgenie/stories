import { readFile } from "fs"
import { promisify } from "util"
import { load } from "js-yaml"
import { RStories, Stories } from "../types"
import { PathReporter } from "io-ts/lib/PathReporter"

const readFileAsync = promisify(readFile)

export const loadStory = async (path: string): Promise<Stories> => {
  const file = await readFileAsync(path)
  const data = load(file.toString())

  if (!RStories.is(data)) {
    throw new Error(
      `Invalid story file: ${path} is not a valid file.\n${PathReporter.report(
        RStories.decode(data),
      )}`,
    )
  }

  return data
}
