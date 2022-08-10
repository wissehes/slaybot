import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import getNowPlaying from "../helpers/getNowPlaying";
import SlayCommand from "../Structs/SlayCommand";

export const NowPlayingCommand: SlayCommand = {
  data: new SlashCommandBuilder()
    .setName("nowplaying")
    .setDescription("Shows the current playing track on SlayRadio"),
  async execute(interaction) {
    try {
      const data = await getNowPlaying();

      const embed = new EmbedBuilder()
        .setTitle(data.now_playing.song.title)
        .setDescription(
          `By *${data.now_playing.song.artist}*\nNext up: **${data.playing_next.song.title}** by **${data.playing_next.song.artist}**`
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

      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      interaction.reply("oopsie an error happened!!! :(");
    }
  },
};
