import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import getOrRefreshAccessToken from "../../helpers/getOrRefreshAccesstoken";
import SlayCommand from "src/Structs/SlayCommand";

export const SpotifyInfoCommand: SlayCommand = {
  data: new SlashCommandBuilder()
    .setName("spotifyinfo")
    .setDescription("Get info about your spotify ;)"),
  async execute(interaction, client) {
    await interaction.deferReply();

    const dbUser = await client.prisma.user.findFirst({
      where: { discordId: interaction.user.id },
    });

    const accesToken = dbUser?.spotifyAccessToken;
    const refreshToken = dbUser?.spotifyRefreshToken;
    const expirationDate = dbUser?.spotifyExpires;

    if (!dbUser || !accesToken || !refreshToken || !expirationDate) {
      await interaction.editReply(
        "You haven't set up Spotify with me yet! Please use `/login` to do that <3"
      );
      return;
    }

    client.spotify.setRefreshToken(refreshToken);

    await getOrRefreshAccessToken(dbUser, client);

    try {
      const { body: me } = await client.spotify.getMe();

      const { body: topartist } = await client.spotify.getMyTopArtists({
        limit: 5,
        time_range: "medium_term",
      });

      const { body: toptracks } = await client.spotify.getMyTopTracks({
        limit: 5,
        time_range: "medium_term",
      });

      const formatted_topartists = topartist.items
        .map((a, i) => `**${i + 1}.** ${a.name}`)
        .join("\n");
      const formatted_toptracks = toptracks.items
        .map(
          (t, i) =>
            `**${i + 1}.** ${t.name} (*${t.artists.map((a) => a.name).join()}*)`
        )
        .join("\n");

      const embed = new EmbedBuilder()
        .setTitle(
          `${me.display_name || interaction.user.username}'s Spotify Info`
        )
        .addFields([
          {
            name: "Display name",
            value: me.display_name || "None",
            inline: true,
          },
          { name: "Country", value: me.country || "Unknown", inline: true },
          //   { name: "ID", value: me.id.toString(), inline: true },
          { name: "Top Artists", value: formatted_topartists },
          { name: "Top Tracks", value: formatted_toptracks },
        ])
        .setThumbnail(me.images?.[0].url || "")
        .setAuthor({
          name: me.display_name || me.id,
          iconURL: me.images?.[0].url || "",
          url: me.external_urls.spotify,
        })
        .setColor("Random");

      client.spotify.resetAccessToken();
      client.spotify.resetRefreshToken();

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      console.error(JSON.stringify(error));
    }
  },
};
