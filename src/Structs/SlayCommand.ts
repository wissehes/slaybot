import {
  ChatInputApplicationCommandData,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";
import SlayClient from "./SlayClient";

export default interface SlayCommand {
  data:
    | Omit<SlashCommandBuilder, "addSubcommandGroup" | "addSubcommand">
    | SlashCommandSubcommandsOnlyBuilder;
  execute: (
    interaction: ChatInputCommandInteraction,
    client: SlayClient
  ) => Promise<void>;
}

// export default class SlayCommand {
//   constructor(options: SlayCommandOptions) {
//     this.data = options.data;
//     this.execute = options.execute;
//   }
//   data: SlashCommandBuilder;
//   execute: (a: ChatInputCommandInteraction) => void;
// }

// type SlayCommandOptions = {
//   data: SlashCommandBuilder;
//   execute: (interaction: ChatInputCommandInteraction) => void;
// };

// new SlayCommand({
//   data: new SlashCommandBuilder().setName("wisse").setDescription("slay"),
//   async execute(interaction) {
//     interaction;
//     await interaction.reply("");
//   },
// });
