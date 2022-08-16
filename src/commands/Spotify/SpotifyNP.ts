import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import SlayCommand from "src/Structs/SlayCommand";
import getOrRefreshAccessToken from "../../helpers/getOrRefreshAccesstoken";

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

    client.spotify.setRefreshToken(refreshToken);

    await getOrRefreshAccessToken(dbUser, client);

    const { body: np } = await client.spotify.getMyCurrentPlaybackState();

    const item = np.item as unknown as {
      artists: { name: string }[];
      album: { images: { url: string }[] | null };
    } | null;
    const artists = item?.artists.map((a) => a.name).join(", ");

    const embed = new EmbedBuilder();

    if (item) {
      embed
        .setAuthor({
          name: `${interaction.user.username}'s Spotify`,
        })
        .setTitle(np.item?.name || "Unknown track")
        .setDescription(`**By:** *${artists}*\n**On:** ${np.device.name}`)
        .setThumbnail(item.album.images?.[0].url || "")
        .setColor("Random");
    } else {
      embed.setTitle("Not Playing anything.").setColor("Random");
    }
    const url = np.item?.external_urls.spotify;
    if (url) embed.setURL(url);

    //   const item = np.item;
    interaction.editReply({ embeds: [embed] });
  },
};
