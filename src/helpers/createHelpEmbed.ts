import { EmbedBuilder } from "discord.js";
import { CommandGroups } from "../commands/Commands";
import { SlayCommandGroup } from "src/Structs/SlayCommand";

export default function createHelpEmbed(category: SlayCommandGroup) {
  const formattedCommands = category.commands
    .map((c) => `- \`/${c.data.name}\`: ${c.data.description}`)
    .join("\n");

  return new EmbedBuilder()
    .setTitle("DilfBot Help")
    .setDescription(`**${category.name}**\n\n${formattedCommands}`)
    .setColor("Random");
}

export function createMainHelpEmbed() {
  const formattedGroups = CommandGroups.map((c) => "**- " + c.name + "**").join(
    "\n"
  );

  return new EmbedBuilder()
    .setTitle("Commands")
    .setColor("Random")
    .setDescription(`These are my command categories:\n${formattedGroups}`);
}
