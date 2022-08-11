import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import createSpotifyLoginURL from "../../helpers/createSpotifyLoginURL";
import SlayCommand from "src/Structs/SlayCommand";

export const LoginCommand: SlayCommand = {
  data: new SlashCommandBuilder()
    .setName("login")
    .setDescription("DM's you the login URL to connect Spotify with me!"),
  async execute(interaction, client) {
    await interaction.deferReply({ ephemeral: true });

    const url = await createSpotifyLoginURL(client, interaction.user.id);

    const embed = new EmbedBuilder()
      .setTitle("Connect Spotify")
      .setDescription(
        `⚠️ Spotify connections are still in beta and will most likely not work.⚠️\n[Log in with Spotify](${url})`
      )
      .setTimestamp()
      .setColor("Green");

    await interaction.editReply({ embeds: [embed] });
  },
};
