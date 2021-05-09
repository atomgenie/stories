import { useAppSelector } from "@helpers/redux/hooks"
import { Header } from "./Header"
import { Description } from "./home/Description"
import { Trames } from "./home/Trames"

export const Home: React.FC = () => {
  const config = useAppSelector(state => state.config)

  return (
    <div className="app-container flex-grow flex flex-col bg-gray-900 text-white">
      <Header />
      {config.picture ? (
        <img src={config.picture} className="w-full object-cover max-h-40" />
      ) : null}
      <div className="container mx-auto">
        {config.description ? <Description description={config.description} /> : null}
        <Trames />
      </div>
    </div>
  )
}
