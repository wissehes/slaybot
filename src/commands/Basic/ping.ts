import { SlashCommandBuilder, Interaction, CacheType } from "discord.js";
import SlayCommand from "src/Structs/SlayCommand";

export const Ping: SlayCommand = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with ping #slay"),
  async execute(interaction) {
    await interaction.reply({ content: "Slay!", ephemeral: true });
  },
};
