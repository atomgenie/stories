import { Trame as TrameType } from "@helpers/stories/types/trame"
import Link from "next/link"

interface TrameProps {
  trame: TrameType
}

export const Trame: React.FC<TrameProps> = props => {
  const { trame } = props

  return (
    <Link href={`/trame/${trame.id}`}>
      <button className="mt-2 overflow-hidden rounded-lg bg-gray-800 px-4 py-2 flex flex-col justify-center">
        <div className="truncate max-w-full">{trame.title}</div>
        {trame.description ? (
          <div className="max-h-7 truncate max-w-full text-sm text-gray-400">
            {trame.description}
          </div>
        ) : null}
      </button>
    </Link>
  )
}
