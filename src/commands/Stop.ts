import { getVoiceConnection } from "@discordjs/voice";
import { SlashCommandBuilder } from "discord.js";
import SlayCommand from "src/Structs/SlayCommand";

export const StopCommand: SlayCommand = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stops playing"),
  async execute(interaction, client) {
    const guild = interaction.client.guilds.cache.get(
      interaction.guild?.id || ""
    );

    if (!guild) return;

    const member = guild.members.cache.get(interaction.user.id);
    const voicechannel = member?.voice.channel;

    if (!voicechannel) {
      await interaction.reply("you're not in a voice channel dumbass");
      return;
    }

    const voiceconnection = getVoiceConnection(guild.id);

    if (
      !voicechannel.members.find((a) => a.id === interaction.client.user?.id)
    ) {
      interaction.reply("We're not in the same voice channel");
      return;
    }

    voiceconnection?.destroy();

    const player = client.players.get(guild.id);
    player?.stop(true);
    client.players.delete(guild.id);

    interaction.reply("Stopped playing 😔");
  },
};
