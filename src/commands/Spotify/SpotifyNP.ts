import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import SlayCommand from "src/Structs/SlayCommand";

export const SpotifyNowPlayingCommand: SlayCommand = {
  data: new SlashCommandBuilder()
    .setName("spotifynowplaying")
    .setDescription("Shows your currently playing track on spotify."),
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

    client.spotify.setAccessToken(accesToken);
    client.spotify.setRefreshToken(refreshToken);

    if (new Date() > expirationDate) {
      console.log("refreshing accesstoken...");
      try {
        await client.spotify.refreshAccessToken();
      } catch (e) {
        console.error(e);
        await interaction.editReply(`Could not refresh access token...`);
        return;
      }
    }

    try {
      const { body: np } = await client.spotify.getMyCurrentPlaybackState();
      console.log(JSON.stringify(np.item));
      const item = np.item as unknown as {
        artists: { name: string }[];
        album: { images: { url: string }[] | null };
      };
      const artists = item.artists.map((a) => a.name).join(", ");

      const embed = new EmbedBuilder()
        .setAuthor({
          name: `${interaction.user.username}'s Spotify`,
        })
        .setTitle(np.item?.name || "Unknown track")
        .setDescription(`**By:** *${artists}*\n**On:** ${np.device.name}`)
        .setThumbnail(item.album.images?.[0].url || "")
        .setColor("Random");

      const url = np.item?.external_urls.spotify;
      if (url) embed.setURL(url);

      //   const item = np.item;
      interaction.editReply({ embeds: [embed] });
    } catch (e) {
      console.error(e);

      interaction.editReply(
        "I couldn't check your now playing status. Please try logging in again using `/login`."
      );
    }
  },
};
