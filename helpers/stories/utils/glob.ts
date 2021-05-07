import defaultGlob from "glob"

export const glob = async (path: string): Promise<ReadonlyArray<string>> => {
  return new Promise((res, rej) => {
    defaultGlob(path, (err, files) => {
      if (err) {
        return rej(err)
      }

      return res(files)
    })
  })
}
