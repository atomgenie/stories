import { Config } from "@helpers/config/config-types"
import { configAction } from "@helpers/redux/config"
import { store } from "@helpers/redux/store"
import { storiesActions } from "@helpers/redux/stories"
import { Scene } from "@helpers/stories/types/scene"
import { Event } from "@helpers/stories/types/event"
import { useEffect } from "react"
import { Provider } from "react-redux"
import { Trame } from "@helpers/stories/types/trame"

export interface BaseProps {
  baseProps: {
    scenes: ReadonlyArray<Scene>
    events: ReadonlyArray<Event>
    trames: ReadonlyArray<Trame>
    config: Config
  }
}
const useBase = (props: BaseProps) => {
  const { scenes, events, trames, config } = props.baseProps

  useEffect(() => {
    store?.dispatch(storiesActions.load({ scenes, events, trames }))
    store?.dispatch(configAction.load(config))
  }, [scenes, events, config])
}

export const BaseProvider: React.FC<BaseProps> = props => {
  useBase(props)

  return <Provider store={store}>{props.children}</Provider>
}
