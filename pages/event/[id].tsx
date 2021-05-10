import { defaultGetStaticProps } from "@helpers/base/back"
import { BaseProps, BaseProvider } from "@helpers/base/front"
import { wrapStories } from "@helpers/stories/wrap"
import { Event } from "components/Event"
import { isString } from "lodash"
import { GetStaticPaths } from "next"
import { useRouter } from "next/router"

interface EventPageProps extends BaseProps {}

const EventPage: React.FC<EventPageProps> = props => {
  const { query } = useRouter()
  const { id: eventId } = query

  if (!isString(eventId)) {
    return <div>Error</div>
  }

  return (
    <BaseProvider baseProps={props.baseProps}>
      <Event eventId={eventId} />
    </BaseProvider>
  )
}

export default EventPage

export const getStaticPaths: GetStaticPaths = async () => {
  const { events } = await wrapStories()

  return {
    paths: events.map(event => ({
      params: { id: event.id },
    })),
    fallback: false,
  }
}

export const getStaticProps = defaultGetStaticProps()
