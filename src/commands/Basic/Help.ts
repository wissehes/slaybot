import {
  ActionRowBuilder,
  EmbedBuilder,
  SelectMenuBuilder,
  SelectMenuComponentOptionData,
  SlashCommandBuilder,
} from "discord.js";
import { createMainHelpEmbed } from "../../helpers/createHelpEmbed";
import SlayCommand from "src/Structs/SlayCommand";
import { CommandGroups, Commands } from "../Commands";

export const HelpCommand: SlayCommand = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows my commands x"),
  async execute(interaction, client) {
    const formattedOptions: SelectMenuComponentOptionData[] = CommandGroups.map(
      (c) => ({ label: c.name, value: c.name })
    );
    const row = new ActionRowBuilder<SelectMenuBuilder>().addComponents(
      new SelectMenuBuilder()
        .setCustomId("helpcategory")
        .setPlaceholder("nothing selected...")
        .setOptions([
          { label: "Main page", value: "mainpage" },
          ...formattedOptions,
        ])
    );

    const embed = createMainHelpEmbed();

    await interaction.reply({ embeds: [embed], components: [row] });
  },
};
