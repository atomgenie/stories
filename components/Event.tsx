import { useAppSelector } from "@helpers/redux/hooks"
import { encodeEvent, REventPovWithTrame } from "@helpers/stories/types/event"
import { encodeScene } from "@helpers/stories/types/scene"
import { getVideoLink } from "@helpers/utils/links"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useMemo, useRef, useState } from "react"
import { FiArrowRight } from "react-icons/fi"
import { PovList } from "./Event/PovList"
import { Header } from "./Header"
import { Loading } from "./Loading"

interface EventProps {
  eventId: string
}

const VIDEO_RATIO = 1080 / 1920

export const Event: React.FC<EventProps> = props => {
  const { eventId } = props
  const [selectedPovIndex, setSelectedPovIndex] = useState(0)
  const { push } = useRouter()

  const iframeRef = useRef<HTMLIFrameElement>(null)

  const events = useAppSelector(state => state.stories.events)
  const trames = useAppSelector(state => state.stories.trames)
  const scenes = useAppSelector(state => state.stories.scenes)

  const event = useMemo(
    () => events.find(event => event.id === eventId),
    [eventId, events],
  )

  const encodedEvent = useMemo(() => (event ? encodeEvent(event) : undefined), [event])

  const selectedScene = useMemo(
    () => scenes.find(scene => scene.id === encodedEvent?.scene),
    [scenes, encodedEvent],
  )

  const selectedVideo = useMemo(
    () => encodedEvent?.povs[selectedPovIndex],
    [encodedEvent, selectedPovIndex],
  )

  useEffect(() => {
    setTimeout(() => {
      const videoHeight = iframeRef.current
        ? iframeRef.current.offsetWidth * VIDEO_RATIO
        : 200

      iframeRef.current?.setAttribute("height", videoHeight.toString())
    }, 0)
  }, [])

  const selectedTrame = useMemo(
    () =>
      REventPovWithTrame.is(selectedVideo)
        ? trames.find(trame => trame.id === selectedVideo.trame)
        : undefined,
    [trames, selectedVideo],
  )

  const authorName = useMemo(() => {
    if (!selectedVideo) {
      return ""
    }

    if (selectedTrame) {
      return selectedTrame.title
    }

    if (REventPovWithTrame.is(selectedVideo)) {
      return selectedVideo.trame
    }

    return selectedVideo.author
  }, [selectedTrame, selectedVideo])

  const nextEvent = useMemo(() => {
    if (!encodedEvent) {
      return undefined
    }

    const sceneId = encodedEvent.scene
    const allEventForScene = events
      .filter(event => event.scene === sceneId)
      .map(encodeEvent)
      .filter(event => event.date.isAfter(encodedEvent.date))
      .sort((eventA, eventB) => eventA.date.unix() - eventB.date.unix())

    if (allEventForScene.length === 0) {
      return undefined
    }

    let nextEvent = allEventForScene[0]
    if (nextEvent.id === encodedEvent.id) {
      if (allEventForScene.length === 1) {
        return undefined
      }
      nextEvent = allEventForScene[1]
    }

    return nextEvent
  }, [encodedEvent])

  if (!encodedEvent) {
    return <Loading />
  }

  return (
    <div className="app-container flex-grow flex flex-col bg-gray-900 text-white">
      <Header />
      <div className="container mx-auto px-4 mt-4 flex items-start">
        <div className="flex-grow">
          <h3 className="text-xl">{encodedEvent.title}</h3>
          <div className="text-xs text-gray-500 mt-2">
            {encodedEvent.date.format("D/MM/YYYY")}
          </div>
          <div className="text-xs text-gray-400">{encodedEvent.date.format("h:mm")}</div>
        </div>
        {selectedScene ? (
          <Link href={`/scene/${selectedScene.id}`}>
            <button
              className="bg-gray-800 rounded-lg px-4 py-2 truncate text-sm shadow"
              style={{ maxWidth: 150 }}
            >
              {selectedScene.title}
            </button>
          </Link>
        ) : null}
      </div>
      {selectedVideo !== undefined ? (
        <div className="container mx-auto px-4 mt-4">
          <iframe
            ref={iframeRef}
            src={getVideoLink(selectedVideo)}
            width="1920"
            height="200"
            className="w-full rounded-lg"
          />
          <div className="flex items-start mt-4 w-full">
            {selectedTrame?.picture ? (
              <button
                className="flex-shrink-0 rounded-full p-1 bg-gray-800 mr-4"
                onClick={() => {
                  selectedTrame && push(`/trame/${selectedTrame.id}`)
                }}
              >
                <img
                  src={selectedTrame.picture}
                  className="object-cover h-14 w-14 overflow-hidden rounded-full"
                />
              </button>
            ) : (
              <div className="flex-shrink-0 rounded-full p-1 bg-gray-800 mr-4">
                <div className="h-14 w-14 overflow-hidden rounded-full text-2xl flex items-center justify-center">
                  ?
                </div>
              </div>
            )}
            <div className="py-2 font-bold text-sm text-gray-300 min-h-14">
              {authorName}
            </div>
          </div>
        </div>
      ) : null}
      {nextEvent !== undefined ? (
        <div className="container mx-auto px-4 flex justify-end">
          <Link href={`/event/${nextEvent.id}`}>
            <button className="bg-gray-800 rounded-lg px-4 py-2 shadow flex items-center">
              <div className="mr-4 text-sm">Prochain event</div>
              <FiArrowRight />
            </button>
          </Link>
        </div>
      ) : (
        <NextScene sceneId={encodedEvent.scene} />
      )}
      <div className="container mx-auto px-4 my-6">
        <PovList
          povs={encodedEvent.povs}
          value={selectedPovIndex}
          onChange={setSelectedPovIndex}
        />
      </div>
    </div>
  )
}

interface NextSceneProps {
  sceneId: string
}

const NextScene: React.FC<NextSceneProps> = ({ sceneId }) => {
  const currentTrameId = useAppSelector(state => state.preferences.currentTrameId)
  const scenes = useAppSelector(state => state.stories.scenes)
  const currentScene = useMemo(() => scenes.find(scene => scene.id === sceneId), [])
  const encodedCurrentScene = useMemo(
    () => (!currentScene ? undefined : encodeScene(currentScene)),
    [currentScene],
  )

  const nextScene = useMemo(() => {
    if (!encodedCurrentScene) {
      return undefined
    }

    const scenesForTrame = scenes
      .filter(scene => scene.trames.some(trame => trame === currentTrameId))
      .map(encodeScene)
      .filter(scene => scene.date.isAfter(encodedCurrentScene.date))

    if (scenesForTrame.length === 0) {
      return undefined
    }

    let nextScene = scenesForTrame[0]

    if (nextScene.id === encodedCurrentScene.id) {
      if (scenesForTrame.length === 1) {
        return undefined
      }

      nextScene = scenesForTrame[1]
    }

    return nextScene
  }, [encodedCurrentScene, scenes, currentTrameId])

  if (!nextScene) {
    return null
  }

  return (
    <div className="container mx-auto px-4 flex justify-end">
      <Link href={`/scene/${nextScene.id}`}>
        <button className="bg-gray-800 rounded-lg px-4 py-2 shadow flex items-center">
          <div className="mr-4 text-sm">Prochaine scene</div>
          <FiArrowRight />
        </button>
      </Link>
    </div>
  )
}
