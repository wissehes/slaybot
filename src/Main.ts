import { ActivityType, GatewayIntentBits } from "discord.js";
import SlayClient from "./Structs/SlayClient";
import dotenv from "dotenv";
import { WebSocket } from "ws";
import { AzuraCastNowPlaying } from "./types/AzuraNPResponse";
import createNowPlayingEmbed from "./helpers/createNPEmbed";
import { CommandGroups } from "./commands/Commands";
import createHelpEmbed, {
  createMainHelpEmbed,
} from "./helpers/createHelpEmbed";
dotenv.config();

const client = new SlayClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

// const ws = new WebSocket(process.env.WS_URL as string);

// ws.on("open", () => console.log("AzuraCast WebSocket connected!"));
// ws.on("message", (data) => {
//   const decoded: AzuraCastNowPlaying = JSON.parse(data.toString());
//   const np = decoded.now_playing.song.text;
//   try {
//     client.user?.setActivity(`${np} on SlayRadio`, {
//       type: ActivityType.Listening,
//     });
//   } catch (e) {
//     console.log("Couldn't update activity!");
//   }
// });

client.once("ready", () => {
  client.user?.setActivity("dilf kasteel", { type: ActivityType.Watching });
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

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

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isSelectMenu()) return;

  if (interaction.customId == "helpcategory") {
    if (interaction.values[0] == "mainpage") {
      const embed = createMainHelpEmbed();
      interaction.update({ embeds: [embed] });
      return;
    }

    const category = CommandGroups.find((g) => g.name == interaction.values[0]);
    if (!category) return;

    const embed = createHelpEmbed(category);
    interaction.update({ embeds: [embed] });
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;
  if (interaction.customId !== "reload-np") return;

  const embed = await createNowPlayingEmbed();
  interaction.update({ embeds: [embed] });
});

client.login(process.env.TOKEN);
