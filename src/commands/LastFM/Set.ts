import { SlashCommandBuilder } from "discord.js";
import SlayCommand from "src/Structs/SlayCommand";

export const SetCommand: SlayCommand = {
  data: new SlashCommandBuilder()
    .setName("set")
    .setDescription("Sets your Last.fm username")
    .addStringOption((option) =>
      option
        .setName("username")
        .setDescription("Your Last.fm username.")
        .setRequired(true)
    ),
  async execute(interaction, { prisma }) {
    const lastfm = interaction.options.getString("username", true);
    await interaction.deferReply();

    const exists = await prisma.user.findFirst({
      where: { discordId: interaction.user.id },
    });

    if (exists) {
      await prisma.user.update({
        where: { id: exists.id },
        data: { lastfm_username: lastfm },
      });
    } else {
      await prisma.user.create({
        data: { discordId: interaction.user.id, lastfm_username: lastfm },
      });
    }

    await interaction.editReply("Updated your last.fm username!");
  },
};
