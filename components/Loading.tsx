import { Header } from "./Header"

export const Loading: React.FC = () => {
  return (
    <div className="app-container flex-grow flex flex-col bg-gray-900 text-white">
      <Header />
      <div className="container mx-auto text-center text-lg">Loading...</div>
    </div>
  )
}
