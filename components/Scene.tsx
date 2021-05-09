import { useAppSelector } from "@helpers/redux/hooks"
import { EEvent, encodeEvent, Event } from "@helpers/stories/types/event"
import { Trame } from "@helpers/stories/types/trame"
import { keyBy } from "lodash"
import Link from "next/link"
import React, { useMemo } from "react"
import { Header } from "./Header"
import { Loading } from "./Loading"

interface SceneProps {
  sceneId: string
}

export const Scene: React.FC<SceneProps> = props => {
  const { sceneId } = props

  const scenes = useAppSelector(state => state.stories.scenes)
  const events = useAppSelector(state => state.stories.events)
  const trames = useAppSelector(state => state.stories.trames)

  const scene = useMemo(() => scenes.find(scene => scene.id === sceneId), [
    sceneId,
    scenes,
  ])

  const normalizedEvents = useMemo(() => normalizeEvents(events, sceneId), [
    events,
    sceneId,
  ])

  const tramesInScene = useMemo(
    () => (scene ? normalizeTrames(scene.trames, trames) : []),
    [scene, trames],
  )

  if (!scene) {
    return <Loading />
  }

  return (
    <div className="app-container flex-grow flex flex-col bg-gray-900 text-white">
      <Header />
      <div className="container mx-auto flex px-4 mt-6">
        {scene.picture ? (
          <img src={scene.picture} className="object-cover h-24 w-20 rounded-lg mr-4" />
        ) : null}
        <div>
          <h3 className="text-2xl font-bold leading-6">{scene.title}</h3>
          {scene.description ? (
            <div className="text-sm text-gray-400 mt-2 leading-4 flex flex-col gap-1">
              {scene.description}
            </div>
          ) : null}
        </div>
      </div>
      <div className="container mx-auto">
        <div className="mt-4 text-xl px-4">Events</div>
        <div className="px-4 mt-2">
          {normalizedEvents.map(event => (
            <React.Fragment key={event.id}>{renderEvent(event)}</React.Fragment>
          ))}
        </div>
      </div>
      <div className="container mx-auto">
        <div className="mt-4 text-xl px-4">Trames</div>
        <div className="px-4 mt-2 flex flex-nowrap overflow-x-auto">
          {tramesInScene.map(trame => (
            <React.Fragment key={trame.id}>{renderTrame(trame)}</React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

const renderEvent = (event: EEvent) => {
  return (
    <button className="bg-gray-800 rounded-lg px-4 py-3 mt-2 w-full text-left">
      <div className="text-xs font-bold text-gray-400 leading-3">
        {event.date.format("h:m - DD/MM/YYYY")}
      </div>
      <div className="leading-4 mt-1">{event.title}</div>
    </button>
  )
}

const renderTrame = (trame: Trame) => {
  return (
    <Link href={`/trame/${trame.id}`}>
      <button className=" h-48 w-36 rounded-lg mr-4 bg-gray-800 overflow-hidden flex flex-col flex-shrink-0">
        {trame.picture ? (
          <img src={trame.picture} className="object-cover h-36 w-full" />
        ) : (
          <div className="h-36 flex items-center justify-center text-4xl font-bold bg-gray-700 w-full">
            ?
          </div>
        )}
        <div className="flex-grow flex items-center justify-center w-full px-4">
          <div className="truncate max-w-full">{trame.title}</div>
        </div>
      </button>
    </Link>
  )
}

const normalizeEvents = (
  events: ReadonlyArray<Event>,
  sceneId: string,
): ReadonlyArray<EEvent> => {
  return events
    .filter(event => event.scene == sceneId)
    .map(event => encodeEvent(event))
    .sort((eventA, eventB) => eventA.date.unix() - eventB.date.unix())
}

const normalizeTrames = (
  trameIds: ReadonlyArray<string>,
  trames: ReadonlyArray<Trame>,
): ReadonlyArray<Trame> => {
  const tramePerIds = keyBy(trames, trame => trame.id)
  return trameIds.map(trameId => tramePerIds[trameId]).filter(Boolean)
}
