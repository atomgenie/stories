import { defaultGetStaticProps } from "@helpers/base/back"
import { BaseProps, BaseProvider } from "@helpers/base/front"
import { wrapStories } from "@helpers/stories/wrap"
import { Scene } from "components/Scene"
import { Trame } from "components/Trame"
import { isString } from "lodash"
import { GetStaticPaths } from "next"
import { useRouter } from "next/router"

interface ScenePageProps extends BaseProps {}

const ScenePage: React.FC<ScenePageProps> = props => {
  const { query } = useRouter()
  const { id: sceneId } = query

  if (!isString(sceneId)) {
    return <div>Error</div>
  }

  return (
    <BaseProvider baseProps={props.baseProps}>
      <Scene sceneId={sceneId} />
    </BaseProvider>
  )
}

export default ScenePage

export const getStaticPaths: GetStaticPaths = async () => {
  const { scenes } = await wrapStories()

  return {
    paths: scenes.map(scene => ({
      params: { id: scene.id },
    })),
    fallback: false,
  }
}

export const getStaticProps = defaultGetStaticProps()
