import { useAppSelector } from "@helpers/redux/hooks"
import { useMemo, useState } from "react"
import { Header } from "./Header"
import { Loading } from "./Loading"

interface SceneProps {
  sceneId: string
}

export const Scene: React.FC<SceneProps> = props => {
  const { sceneId } = props

  const scenes = useAppSelector(state => state.stories.scenes)

  const scene = useMemo(() => scenes.find(scene => scene.id === sceneId), [
    sceneId,
    scenes,
  ])

  if (!scene) {
    return <Loading />
  }

  return (
    <div className="app-container flex-grow flex flex-col bg-gray-900 text-white">
      <Header />
      <div className="container mx-auto">{scene.title}</div>
    </div>
  )
}
