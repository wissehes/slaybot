import Canvas from "@napi-rs/canvas";
import { AttachmentBuilder, SlashCommandBuilder } from "discord.js";
import SlayCommand from "src/Structs/SlayCommand";
import {
  getTopAlbumsResponse,
  Image,
} from "src/types/Lastfm/TopAlbumsResponse";

const CANVAS_SIZE = 1000;

const getlfmpic = (images: Image[]) => {
  return (
    images.find((a) => a.size == "extralarge")?.["#text"] ||
    images.pop()?.["#text"] ||
    ""
  );
};

const sliceArray = <T>(array: Array<T>, size: number) => {
  const res = [];
  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size);
    res.push(chunk);
  }
  return res;
};

export const CollageCommand: SlayCommand = {
  data: new SlashCommandBuilder()
    .setName("collage")
    .setDescription("Creates a collage of your most listened albums")
    .addStringOption((option) =>
      option
        .setName("period")
        .setDescription("The time period for stats")
        .setChoices(
          { name: "Last 7 days", value: "7days" },
          { name: "Last 30 days", value: "1month" },
          { name: "Last 90 days", value: "3month" },
          { name: "Last 180 days", value: "6month" },
          { name: "Last 365 days", value: "12month" },
          { name: "All time", value: "overall" }
        )
        .setRequired(true)
    ),
  async execute(interaction, client) {
    await interaction.deferReply();
    const lastfm_period = interaction.options.getString("period", true);

    const user = await client.prisma.user.findFirst({
      where: { discordId: interaction.user.id },
    });

    if (!user || !user.lastfm_username) {
      interaction.editReply(
        "You haven't set your Last.fm username up with me yet. Use `/set <username>`."
      );
      return;
    }

    const { data } = await client.lastfm.get<getTopAlbumsResponse>("", {
      params: {
        method: "user.gettopalbums",
        user: user.lastfm_username,
        limit: 9,
        period: lastfm_period,
      },
    });

    const albums = data.topalbums.album;

    const canvas = Canvas.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    const singlesize = CANVAS_SIZE / 3;
    const context = canvas.getContext("2d");

    const _rows = sliceArray(albums, 3);

    for (const [rowindex, row] of _rows.entries()) {
      for (const [albumindex, album] of row.entries()) {
        const image = await Canvas.loadImage(getlfmpic(album.image));

        const x_placement = albumindex * singlesize;
        const y_placement = rowindex * singlesize;
        const y_text_placement = (rowindex + 1) * singlesize;
        context.drawImage(
          image,
          x_placement,
          y_placement,
          singlesize,
          singlesize
        );
        context.font = "48px serif";
        // context.textAlign = "center";
        context.fillText(
          album.name,
          x_placement + 10,
          y_text_placement,
          singlesize - 10
        );
      }
    }

    const att = new AttachmentBuilder(await canvas.encode("png"), {
      name: "lastfm-grid.png",
    });

    interaction.editReply({
      content: `${interaction.user.toString()}'s top albums`,
      files: [att],
    });
  },
};
