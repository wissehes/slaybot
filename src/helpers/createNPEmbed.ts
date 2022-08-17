import { EmbedBuilder } from "discord.js";
import getNowPlaying from "./getNowPlaying";

export default async function createNowPlayingEmbed() {
  const data = await getNowPlaying();

  return new EmbedBuilder()
    .setTitle(data.now_playing.song.title)
    .setDescription(
      `By *${data.now_playing.song.artist}*\nOn ${data.now_playing.song.album}\nNext up: **${data.playing_next.song.title}** by **${data.playing_next.song.artist}**`
    )
    .setThumbnail(data.now_playing.song.art)
    .setColor("Blue")
    .setAuthor({
      name: "SlayRadio",
      url: "https://radio.smarthome.wissehes.nl/public/slay",
    })
    .setFooter({
      text: "Use /slay to listen in your vc",
      iconURL: data.playing_next.song.art,
    });
}
