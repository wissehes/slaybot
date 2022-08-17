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

export interface SlayCommandGroup {
  name: string;
  commands: SlayCommand[];
}
