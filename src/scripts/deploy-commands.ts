import { SlashCommandBuilder, Routes } from "discord.js";
import { REST } from "@discordjs/rest";
import dotenv from "dotenv";
import { Commands } from "../commands/Commands";
dotenv.config();

const config = {
  token: process.env.TOKEN || "",
  clientId: process.env.CLIENTID || "",
  guildId: process.env.GUILDID || "",
};

const commands = Commands.map((c) => c.data.toJSON());

// for (const command of commandFiles) {
//   const filePath = path.join(commandsPath, file);
//   const command = require(filePath);
//   commands.push(command.data.toJSON());
//   console.log(command.data.name);
// }

const rest = new REST({ version: "10" }).setToken(config.token);

rest
  .put(Routes.applicationGuildCommands(config.clientId, config.guildId), {
    body: commands,
  })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
