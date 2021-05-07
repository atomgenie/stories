import { GetStaticProps } from "next"
import { FC, useEffect } from "react"
import { Provider } from "react-redux"
import { store } from "@helpers/redux/store"
import { Timeline } from "@helpers/stories/types/timeline"
import { wrapStories } from "@helpers/stories/wrap"
import { storiesActions } from "@helpers/redux/stories"
import { Scene } from "@helpers/stories/types/scene"
import { loadConfig } from "@helpers/config/config-load"
import { Config } from "@helpers/config/config-types"
import { configAction } from "@helpers/redux/config"

interface AppProps {
  scenes: ReadonlyArray<Scene>
  timelines: ReadonlyArray<Timeline>
  config: Config
}

const App: FC<AppProps> = props => {
  const { config, ...stories } = props
  useEffect(() => {
    store?.dispatch(storiesActions.load(stories))
    store?.dispatch(configAction.load(config))
  }, [config, stories])
  return <Provider store={store}>Hello!{JSON.stringify(props)}</Provider>
}

export default App

export const getStaticProps: GetStaticProps<AppProps> = async () => {
  const data = await wrapStories()
  const config = await loadConfig()

  return {
    props: {
      ...data,
      config,
    },
  }
}
