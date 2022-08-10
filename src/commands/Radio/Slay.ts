import { SlashCommandBuilder } from "discord.js";
import SlayCommand from "../../Structs/SlayCommand";

import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
} from "@discordjs/voice";
import getNowPlaying from "../../helpers/getNowPlaying";

export const Slay: SlayCommand = {
  data: new SlashCommandBuilder()
    .setName("slay")
    .setDescription("Plays SlayRadio in your voice channel!")
    .addBooleanOption((option) =>
      option
        .setName("silent")
        .setDescription(
          "Set to 'true' if you don't want me to send the now-playing info."
        )
        .setRequired(false)
    ),
  async execute(interaction, client) {
    const shouldSilent =
      interaction.options.getBoolean("silent", false) || false;
    const guild = interaction.client.guilds.cache.get(
      interaction.guild?.id || ""
    );
    if (!guild) return;

    const member = guild.members.cache.get(interaction.user.id);
    const voicechannel = member?.voice.channel;

    if (!voicechannel) {
      await interaction.reply("you're not in a voice channel");
      return;
    }

    const connection = joinVoiceChannel({
      channelId: voicechannel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
    });

    const { player, resource } = createplayer();
    client.players.set(guild.id, player);

    const { now_playing } = await getNowPlaying();

    connection.subscribe(player);
    player.play(resource);

    interaction.reply({
      content: `Playing **${now_playing.song.title}** by *${now_playing.song.artist}* from SlayRadio in your voice channel!`,
      ephemeral: shouldSilent,
    });
  },
};

const createplayer = () => {
  const player = createAudioPlayer();
  const resource = createAudioResource(
    "https://radio.smarthome.wissehes.nl/listen/slay/mobile.aac"
  );

  return { player, resource };
};
