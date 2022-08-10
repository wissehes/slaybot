const { Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");
const config = require("../config.js");

const rest = new REST({ version: 10 }).setToken(config.token);

await rest.put(Routes.applicationCommands(config.clientId), { body: [] });
