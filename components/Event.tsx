import { useAppSelector } from "@helpers/redux/hooks"
import { encodeEvent, REventPovWithTrame } from "@helpers/stories/types/event"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useMemo, useRef, useState } from "react"
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

  const event = useMemo(() => events.find(event => event.id === eventId), [
    eventId,
    events,
  ])

  const encodedEvent = useMemo(() => (event ? encodeEvent(event) : undefined), [event])

  const selectedScene = useMemo(
    () => scenes.find(scene => scene.id === encodedEvent?.scene),
    [scenes, encodedEvent],
  )

  const selectedVideo = useMemo(() => encodedEvent?.povs[selectedPovIndex], [
    encodedEvent,
    selectedPovIndex,
  ])

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
              className="bg-gray-800 rounded-lg px-4 py-2 truncate text-sm"
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
            src={selectedVideo.link}
            width="1920"
            height="200"
            className="w-full rounded-lg"
          />
          <button
            className="flex items-start mt-4 w-full"
            onClick={() => {
              selectedTrame && push(`/trame/${selectedTrame.id}`)
            }}
          >
            {selectedTrame?.picture ? (
              <div className="flex-shrink-0 rounded-full p-1 bg-gray-800 mr-4">
                <img
                  src={selectedTrame.picture}
                  className="object-cover h-14 w-14 overflow-hidden rounded-full"
                />
              </div>
            ) : null}
            <div className="py-2 font-bold text-sm text-gray-300 min-h-14">
              {authorName}
            </div>
          </button>
        </div>
      ) : null}
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
