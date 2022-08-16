import { ActivityType, GatewayIntentBits } from "discord.js";
import SlayClient from "./Structs/SlayClient";
import dotenv from "dotenv";
dotenv.config();

const client = new SlayClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

client.once("ready", () => {
  client.user?.setActivity("dilf kasteel", { type: ActivityType.Watching });
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  interaction.reply;

  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error(error);
    interaction
      .reply({
        content:
          "There was an error while executing your command... i didnt slay :(",
        ephemeral: true,
      })
      .catch(async () => {
        await interaction.editReply({
          content:
            "There was an error while executing your command... i didnt slay :(",
        });
      });
  }
});

client.login(process.env.TOKEN);
