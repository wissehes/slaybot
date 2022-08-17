import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  SlashCommandBuilder,
} from "discord.js";
import SlayCommand from "src/Structs/SlayCommand";
import createNowPlayingEmbed from "../../helpers/createNPEmbed";

export const NowPlayingCommand: SlayCommand = {
  data: new SlashCommandBuilder()
    .setName("nowplaying")
    .setDescription("Shows the current playing track on SlayRadio"),
  async execute(interaction) {
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId("reload-np")
        .setLabel("Refresh")
        .setStyle(ButtonStyle.Primary)
        .setEmoji("🔄")
    );

    try {
      const embed = await createNowPlayingEmbed();

      interaction.reply({ embeds: [embed], components: [row] });
    } catch (error) {
      console.error(error);
      interaction.reply("oopsie an error happened!!! :(");
    }
  },
};
