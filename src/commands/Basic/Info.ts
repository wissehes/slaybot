import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import SlayCommand from "src/Structs/SlayCommand";

export const InfoCommand: SlayCommand = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("gives you some info about me xx"),
  async execute(interaction, client) {
    const creation = interaction.guild?.createdAt.toLocaleDateString("nl-NL", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "2-digit",
    });

    const embed = new EmbedBuilder()
      .setTitle("DilfBot")
      .setThumbnail(client.user?.avatarURL() || "")
      .addFields([
        { name: "Creator", value: "wisse de homo" },
        {
          name: "GitHub Repo",
          value: "[wissehes/slaybot](https://github.com/wissehes/slaybot)",
        },
        { name: "slay?", value: "slay." },
        { name: "\u200B", value: "\u200B" },
        {
          name: "Member count",
          value: `${interaction.guild?.memberCount} members`,
          inline: true,
        },
        { name: "Server creation", value: creation || "Unknown", inline: true },
      ])
      .setColor("Random");

    interaction.reply({ embeds: [embed] });
  },
};
