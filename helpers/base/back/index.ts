import { GetStaticProps, GetStaticPropsContext } from "next"
import { Config } from "@helpers/config/config-types"
import { Scene } from "@helpers/stories/types/scene"
import { Event } from "@helpers/stories/types/event"
import { wrapStories } from "@helpers/stories/wrap"
import { loadConfig } from "@helpers/config/config-load"
import { Trame } from "@helpers/stories/types/trame"

export interface BaseProps {
  baseProps: {
    scenes: ReadonlyArray<Scene>
    events: ReadonlyArray<Event>
    trames: ReadonlyArray<Trame>
    config: Config
  }
}

export const wrapGetStaticProps = <T extends Record<string, any>>(
  fetcher: GetStaticProps<T>,
): GetStaticProps<T & BaseProps> => {
  return async (context: GetStaticPropsContext) => {
    const [initialProps, stories, config] = await Promise.all([
      fetcher(context),
      wrapStories(),
      loadConfig(),
    ])

    return {
      ...initialProps,
      props: {
        baseProps: {
          config,
          ...stories,
        },
        ...((initialProps as any).props || {}),
      },
    }
  }
}

export const defaultGetStaticProps = () => wrapGetStaticProps(async () => ({ props: {} }))
