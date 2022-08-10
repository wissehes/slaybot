import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import SlayCommand from "src/Structs/SlayCommand";

export const TimeCommand: SlayCommand = {
  data: new SlashCommandBuilder()
    .setName("time")
    .setDescription("Shows the time!!1!"),
  async execute(interaction, client) {
    const date = new Date();
    const time = date.toLocaleTimeString("nl-NL", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const embed = new EmbedBuilder()
      .setTitle("De Tijd!")
      .setDescription(`Het is nu **${time}** #slay`)
      .setColor("Aqua");

    interaction.reply({ embeds: [embed] });
  },
};
