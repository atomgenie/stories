import { defaultGetStaticProps } from "@helpers/base/back"
import { BaseProps, BaseProvider } from "@helpers/base/front"
import { wrapStories } from "@helpers/stories/wrap"
import { Trame } from "components/Trame"
import { isString } from "lodash"
import { GetStaticPaths } from "next"
import { useRouter } from "next/router"

interface TramePageProps extends BaseProps {}

const TramePage: React.FC<TramePageProps> = props => {
  const { query } = useRouter()
  const { id: trameId } = query

  if (!isString(trameId)) {
    return <div>Error</div>
  }

  return (
    <BaseProvider baseProps={props.baseProps}>
      <Trame trameId={trameId} />
    </BaseProvider>
  )
}

export default TramePage

export const getStaticPaths: GetStaticPaths = async () => {
  const { trames } = await wrapStories()

  return {
    paths: trames.map(trame => ({
      params: { id: trame.id },
    })),
    fallback: false,
  }
}

export const getStaticProps = defaultGetStaticProps()
