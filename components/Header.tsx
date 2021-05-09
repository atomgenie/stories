import { useAppSelector } from "@helpers/redux/hooks"
import Link from "next/link"

import { FiArrowLeft, FiBookOpen } from "react-icons/fi"
import { useRouter } from "next/router"

export const Header: React.FC = () => {
  const serverName = useAppSelector(state => state.config.title)
  const { back } = useRouter()

  const handleBack = () => {
    back()
  }

  return (
    <div className="bg-gray-800 text-white sticky top-0 border-b border-gray-900">
      <div className="container mx-auto h-14 flex items-center">
        <button onClick={handleBack} className="px-4 text-2xl bg-gray-700 h-full">
          <FiArrowLeft />
        </button>
        <Link href="/">
          <button className="px-4 text-2xl h-full">
            <FiBookOpen />
          </button>
        </Link>
        <div className="flex-grow">
          <h2 className="text-sm opacity-50 leading-3">Stories</h2>
          <h1 className="text-lg leading-5">{serverName}</h1>
        </div>
      </div>
    </div>
  )
}
