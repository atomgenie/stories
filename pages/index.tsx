import { FC } from "react"
import { BaseProvider } from "@helpers/base/front"
import { BaseProps, defaultGetStaticProps } from "@helpers/base/back"
import { Home } from "components/Home"

interface AppProps extends BaseProps {}

const App: FC<AppProps> = props => {
  return (
    <BaseProvider baseProps={props.baseProps}>
      <Home />
    </BaseProvider>
  )
}

export default App

export const getStaticProps = defaultGetStaticProps()
