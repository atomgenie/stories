import { EventPov } from "@helpers/stories/types/event"

const youtubeRegxp = /^https:\/\/youtu\.be\/([a-zA-Z0-9]+)(\?t=(\d+))?$/

const getYoutubeLink = (link: string): string => {
  const regexp = youtubeRegxp.exec(link)

  if (!regexp) {
    return link
  }

  let end = ""

  if (regexp[3]) {
    end = `?start=${regexp[3]}`
  }

  return `https://www.youtube.com/embed/${regexp[1]}${end}`
}

const twitchRegxpVideo = /^https:\/\/www\.twitch\.tv\/videos\/(\d+)(\?t=(.+))?$/
const twictRegxpClip = /^https:\/\/clips\.twitch\.tv\/([^-]+-[a-zA-Z0-9]+)$/
// https://clips.twitch.tv/embed?clip=AthleticTemperedMageOneHand-ukyXMRXBs50hgVaC&parent=www.example.com
// https://clips.twitch.tv/AthleticTemperedMageOneHand-ukyXMRXBs50hgVaC

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
