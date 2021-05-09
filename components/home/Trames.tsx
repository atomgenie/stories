import { useAppSelector } from "@helpers/redux/hooks"
import { Trame } from "./Trame"
import Fuse from "fuse.js"
import { useMemo, useState } from "react"
import { InputSearch } from "components/InputSearch"

export const Trames: React.FC = () => {
  const trames = useAppSelector(state => state.stories.trames)
  const [search, setSearch] = useState("")
  const fuse = useMemo(() => {
    return new Fuse(trames, { keys: ["title"] })
  }, [trames])

  const tramesWithSearch = useMemo(() => {
    if (!search) {
      return trames
    }

    return fuse.search(search).map(item => item.item)
  }, [fuse, search, trames])

  return (
    <div className="px-4">
      <h3 className="text-lg">Trames</h3>
      <InputSearch
        value={search}
        onChange={setSearch}
        placeholder="Rechercher des trames"
        className="mb-2 mt-4 w-full"
      />
      <div className="flex flex-col">
        {tramesWithSearch.map(trame => (
          <Trame key={trame.id} trame={trame} />
        ))}
      </div>
    </div>
  )
}
