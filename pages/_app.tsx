import { FC } from "react"
import "../styles/globals.css"

const App: FC<any> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default App
