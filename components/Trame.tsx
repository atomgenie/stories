import { useAppSelector } from "@helpers/redux/hooks"
import { Scene } from "@helpers/stories/types/scene"
import { Trame as TrameType } from "@helpers/stories/types/trame"
import { useMemo, useState } from "react"
import { Header } from "./Header"
import { Loading } from "./Loading"
import Fuse from "fuse.js"
import { InputSearch } from "./InputSearch"
import Link from "next/link"
import { renderMultilineString } from "@helpers/utils/render-multiline-string"

interface TrameProps {
  trameId: string
}

export const Trame: React.FC<TrameProps> = props => {
  const { trameId } = props

  const [search, setSearch] = useState("")

  const trames = useAppSelector(state => state.stories.trames)
  const scenes = useAppSelector(state => state.stories.scenes)

  const trame = useMemo(() => trames.find(trame => trame.id === trameId), [
    trameId,
    trames,
  ])

  const scenesForTrame = useMemo(() => (trame ? getSceneFromTrame(scenes, trame) : []), [
    scenes,
    trames,
  ])

  const fuzy = useMemo(() => new Fuse(scenesForTrame, { keys: ["title"] }), [
    scenesForTrame,
  ])

  const scenesForTrameWithSearch = useMemo(() => {
    if (!search) {
      return scenesForTrame
    }

    return fuzy.search(search).map(item => item.item)
  }, [scenesForTrame, fuzy, search])

  if (!trame) {
    return <Loading />
  }

  const description = renderMultilineString(trame.description)
  const story = renderMultilineString(trame.story)

  return (
    <div className="app-container flex-grow flex flex-col bg-gray-900 text-white">
      <Header />
      <div className="container mx-auto">
        <div className="px-4 mt-6 flex">
          {trame.picture ? (
            <img src={trame.picture} className="object-cover h-24 w-20 rounded-lg mr-4" />
          ) : null}
          <div>
            <h3 className="text-2xl font-bold leading-6">
              {trame.fullname || trame.title}
            </h3>
            {trame.description ? (
              <div className="text-sm text-gray-400 mt-2 leading-4 flex flex-col gap-1">
                {description}
              </div>
            ) : null}
          </div>
        </div>
        <div className="px-4 mt-4">
          <div className="text-xl">Scenes</div>
          <InputSearch
            value={search}
            onChange={setSearch}
            placeholder="Rechercher des scenes"
            className="mt-4 w-full"
          />
          <div className="mt-4">
            {scenesForTrameWithSearch.map(scene => (
              <Link href={`/scene/${scene.id}`} key={scene.id}>
                <button className="mt-2 bg-gray-800 rounded-lg px-4 py-2 flex flex-col w-full overflow-hidden">
                  <div>{scene.title}</div>
                  {scene.description ? (
                    <div className="text-sm text-gray-400 truncate max-w-full max-h-7">
                      {scene.description}
                    </div>
                  ) : null}
                </button>
              </Link>
            ))}
          </div>
        </div>
        {trame.story ? (
          <div className="px-4 mt-4">
            <div className="text-xl">Histoire</div>
            <div className="mt-2 mb-4 text-sm text-gray-400 flex flex-col leading-4 gap-3">
              {story}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

const getSceneFromTrame = (
  scenes: ReadonlyArray<Scene>,
  trame: TrameType,
): ReadonlyArray<Scene> => {
  return scenes.filter(scene => scene.trames.some(sceneTrame => sceneTrame === trame.id))
}
