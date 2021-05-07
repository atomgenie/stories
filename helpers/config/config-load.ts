import { readFile } from "fs"
import { promisify } from "util"
import { load } from "js-yaml"
import { RConfig, Config } from "./config-types"
import { PathReporter } from "io-ts/lib/PathReporter"

const readFileAsync = promisify(readFile)

export const loadConfig = async (): Promise<Config> => {
  const configFile = await readFileAsync("data/config.yaml")
  const configData = load(configFile.toString())

  if (!RConfig.is(configData)) {
    throw new Error(
      `Invalid config file.\n${PathReporter.report(RConfig.decode(configData))}`,
    )
  }

  return configData
}
