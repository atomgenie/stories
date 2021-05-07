import { glob } from "./glob"

export const importStories = async (): Promise<ReadonlyArray<string>> => {
  return glob("data/stories/**/*.yaml")
}
