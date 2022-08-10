const { SlashCommandBuilder, Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");
const path = require("path");
const fs = require("fs");
const config = require("../config.js");

const commands = [];

const commandsPath = path.resolve(__dirname, "..", "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((f) => f.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
  console.log(command.data.name);
}

const rest = new REST({ version: 10 }).setToken(config.token);

rest
  .put(Routes.applicationGuildCommands(config.clientId, config.guildId), {
    body: commands,
  })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
