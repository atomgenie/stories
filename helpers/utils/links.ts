import { EventPov } from "@helpers/stories/types/event"

const youtubeClipRegxp = /^https:\/\/youtu\.be\/([a-zA-Z0-9]+)(\?t=(\d+))?$/
const youtubeRegularRegxp = /^https:\/\/www\.youtube\.com\/watch\?v=(\w+)$/

const getYoutubeLink = (link: string): string => {
  const regexp = youtubeClipRegxp.exec(link)

  if (regexp) {
    let end = ""

    if (regexp[3]) {
      end = `?start=${regexp[3]}`
    }

    return `https://www.youtube.com/embed/${regexp[1]}${end}`
  }

  const regularRegxp = youtubeRegularRegxp.exec(link)

  if (regularRegxp) {
    return `https://www.youtube.com/embed/${regularRegxp[1]}`
  }

  return link
}

const twitchRegxpVideo = /^https:\/\/www\.twitch\.tv\/videos\/(\d+)(\?t=(.+))?$/
const twictRegxpClip = /^https:\/\/clips\.twitch\.tv\/([^-]+-[a-zA-Z0-9]+)$/

const getTwitchLink = (link: string): string => {
  const regxpVideo = twitchRegxpVideo.exec(link)

  if (regxpVideo) {
    let time = ""

    if (regxpVideo[3]) {
      time = `&time=${regxpVideo[3]}`
    }

    return `https://player.twitch.tv/?video=${regxpVideo[1]}${time}&parent=${process.env.NEXT_PUBLIC_UI_HOST}&autoplay=false`
  }

  const rexpClip = twictRegxpClip.exec(link)

  if (rexpClip) {
    return `https://clips.twitch.tv/embed?clip=${rexpClip[1]}&parent=${process.env.NEXT_PUBLIC_UI_HOST}`
  }

  return link
}

export const getVideoLink = (eventPov: EventPov): string => {
  if (eventPov.youtube) {
    return getYoutubeLink(eventPov.youtube)
  }

  if (eventPov.twitch) {
    return getTwitchLink(eventPov.twitch)
  }

  return ""
}
