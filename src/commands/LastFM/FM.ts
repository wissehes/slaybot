import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import getLastfmRecents from "../../helpers/getLastfmRecent";
import SlayCommand from "src/Structs/SlayCommand";

export const FMCommand: SlayCommand = {
  data: new SlashCommandBuilder()
    .setName("fm")
    .setDescription("Shows your current or last played track from Last.fm"),
  async execute(interaction, client) {
    await interaction.deferReply();

    const user = await client.prisma.user.findFirst({
      where: { discordId: interaction.user.id },
    });

    if (!user || !user.lastfm_username) {
      interaction.reply(
        "You haven't set your Last.fm username up with me yet. Use `/set <username>`."
      );
      return;
    }

    try {
      const lastfmdata = await getLastfmRecents(user.lastfm_username);
      const first = lastfmdata.recenttracks.track[0];

      const embed = new EmbedBuilder()
        .setTitle(first.name)
        .setDescription(`By ${first.artist["#text"]}`)
        .setThumbnail(
          first.image.find((a) => a.size == "large")?.["#text"] || ""
        );

      if (first["@attr"]?.nowplaying) {
        embed.setAuthor({
          name: `Now playing for ${interaction.user.username}`,
          iconURL: interaction.user.avatarURL() || "",
        });
      } else {
        embed.setAuthor({
          name: `Latest track for ${interaction.user.username}`,
          iconURL: interaction.user.avatarURL() || "",
        });
      }
      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.log(error);
      await interaction.editReply("er ging iets mis :(");
    }
  },
};
