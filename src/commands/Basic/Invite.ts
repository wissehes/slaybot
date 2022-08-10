import { SlashCommandBuilder } from "discord.js";
import SlayCommand from "../../Structs/SlayCommand";

export const InviteCommand: SlayCommand = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Shows my invitation url <3"),
  // https://discord.com/oauth2/authorize?client_id=938881570968842351&scope=bot&permissions=274881367040
  //https://discord.com/oauth2/authorize?client_id=938881570968842351&scope=bot&permissions=8
  async execute(interaction, client) {
    interaction.reply(
      `My invite url is: https://discord.com/oauth2/authorize?client_id=${client.user?.id}&scope=bot&permissions=274881367040`
    );
  },
};
