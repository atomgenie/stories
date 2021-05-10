import { useAppSelector } from "@helpers/redux/hooks"
import { EventPov, REventPovWithTrame } from "@helpers/stories/types/event"
import { Trame } from "@helpers/stories/types/trame"
import { keyBy } from "lodash"
import { useEffect, useMemo, useRef, useState } from "react"

interface PovListProps {
  povs: ReadonlyArray<EventPov>
  value: number
  onChange: (value: number) => void
}

const MIN_VIDEO_WIDTH = 170

interface VideoSize {
  width: number
  height: number
}

export const PovList: React.FC<PovListProps> = props => {
  const { povs, onChange } = props
  const [videoSize, setVideoSize] = useState<VideoSize>({
    width: MIN_VIDEO_WIDTH,
    height: getVideoHeight(MIN_VIDEO_WIDTH),
  })

  const trames = useAppSelector(state => state.stories.trames)

  const divContainer = useRef<HTMLDivElement>(null)

  const authors = useMemo(() => getAuthorsPerPov(povs, trames), [povs, trames])

  useEffect(() => {
    setTimeout(() => {
      if (!divContainer.current) {
        return
      }

      const containerWidth = divContainer.current.offsetWidth
      const videoInOnLine = Math.trunc(containerWidth / MIN_VIDEO_WIDTH)
      const gapSize = Math.max((videoInOnLine - 1) * 10, 0)
      const videoWidth = (containerWidth - gapSize) / videoInOnLine
      setVideoSize({ width: videoWidth, height: getVideoHeight(videoWidth) })
    }, 0)
  }, [])

  return (
    <div className="flex flex-wrap video-container" ref={divContainer}>
      {povs.map((pov, index) => (
        <div
          key={pov.link}
          style={{ width: videoSize.width }}
          className="truncate flex flex-col relative mb-2"
        >
          <iframe
            src={pov.link}
            height={videoSize.height}
            width={videoSize.width}
            className="rounded-lg"
          />
          <button
            className="absolute top-0 left-0 w-full h-full bg-transparent"
            onClick={e => {
              onChange(index)
              console.log("test")
            }}
          ></button>
          <div className="mt-2 text-sm text-gray-400">{authors[index]}</div>
        </div>
      ))}
      <style jsx>{`
        .video-container {
          gap: 10px;
        }
      `}</style>
    </div>
  )
}

const getVideoHeight = (width: number) => width * (1080 / 1920)

const getAuthorsPerPov = (
  povs: ReadonlyArray<EventPov>,
  trames: ReadonlyArray<Trame>,
): ReadonlyArray<string> => {
  const tramesById = keyBy(trames, trame => trame.id)

  return povs.map(pov => {
    if (REventPovWithTrame.is(pov)) {
      if (tramesById[pov.trame]) {
        return tramesById[pov.trame].title
      }

      return pov.trame
    }

    return pov.author
  })
}
