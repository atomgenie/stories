import { readFile } from "fs"
import { promisify } from "util"
import { load } from "js-yaml"
import { RStories, Stories } from "../types"
import { PathReporter } from "io-ts/lib/PathReporter"
import { isRight } from "fp-ts/lib/Either"

const readFileAsync = promisify(readFile)

export const loadStory = async (path: string): Promise<Stories> => {
  const file = await readFileAsync(path)
  const data = load(file.toString())

  const decodedData = RStories.decode(data)

  if (!isRight(decodedData)) {
    throw new Error(
      `Invalid story file: ${path} is not a valid file.\n${PathReporter.report(
        decodedData,
      )}`,
    )
  }

  return decodedData.right
}
