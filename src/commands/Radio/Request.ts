import { AxiosError } from "axios";
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import SlayCommand from "src/Structs/SlayCommand";
import { getRequestsResponse } from "../../types/Azura/RequestsResponse";

export const RequestCommand: SlayCommand = {
  data: new SlashCommandBuilder()
    .setName("request")
    .setDescription("Request songs on SlayRadio")
    .addStringOption((option) =>
      option
        .setName("song")
        .setDescription(
          "The title (and artist) of the song you want to request."
        )
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const songtitle = interaction.options.getString("song", true);
    await interaction.deferReply();

    const { data } = await client.azura.get<getRequestsResponse>(
      "/station/1/requests"
    );

    const foundsong = data.filter((s) =>
      s.song.text.toLowerCase().includes(songtitle.toLowerCase())
    );

    if (foundsong[0]) {
      const song = foundsong[0].song;
      const requestid = foundsong[0].request_id;

      const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setCustomId("request")
          .setLabel("Request")
          .setStyle(ButtonStyle.Primary)
          .setEmoji("🔄")
      );

      const embed = new EmbedBuilder()
        .setTitle("Found song")
        .setDescription(
          `Do you want to request **${song.title}** by ${song.artist}`
        )
        .setThumbnail(song.art)
        .setAuthor({
          name: "SlayRadio",
          url: "https://radio.smarthome.wissehes.nl/public/slay",
        })
        .setColor("Random");
      await interaction.editReply({ embeds: [embed], components: [row] });

      interaction.channel
        ?.awaitMessageComponent({
          filter: async (i) => {
            await i.deferUpdate();
            return i.user.id == interaction.user.id;
          },
          componentType: ComponentType.Button,
          time: 15000,
        })
        .then(async (i) => {
          console.log("requesting song");
          row.components[0].setDisabled(true);
          try {
            await client.azura.post(`/station/1/request/${requestid}`);
            console.log("song requested");

            i.editReply({
              content: `${song.title} requested and will play soon!`,
              components: [row],
              embeds: [],
            });
          } catch (e) {
            if (e instanceof AxiosError) {
              const data = e.response?.data as { message: string };
              const errorembed = new EmbedBuilder()
                .setTitle("An error occurred!")
                .setDescription(data.message || "Unknown error")
                .setColor("Red");

              i.editReply({
                components: [row],
                embeds: [errorembed],
              });
            }
          }
        })
        .catch((err) => null);
    } else {
      interaction.editReply("Couldn't find that song </3");
      return;
    }
  },
};
