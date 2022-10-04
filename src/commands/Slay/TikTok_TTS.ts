import axios from "axios";
import { AttachmentBuilder, SlashCommandBuilder } from "discord.js";
import SlayCommand from "src/Structs/SlayCommand";

interface TTSResponse {
  success: boolean;
  data: string;
  error: string | null;
}

export const TikTokTTSCommand: SlayCommand = {
  data: new SlashCommandBuilder()
    .setName("tts")
    .setDescription("Use TikTok's text-to-speech #slay")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("The text to turn into speech")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("voice")
        .setDescription("Choose the voice")
        .setRequired(true)
        .addChoices(
          { name: "Australian EN - Female", value: "en_au_001" },
          { name: "Australian EN - Male", value: "en_au_002" },
          { name: "British EN - Male 1", value: "en_uk_001" },
          { name: "British EN - Male 2", value: "en_uk_003" },
          { name: "American EN - Female 1", value: "en_us_001" },
          { name: "American EN - Female 2", value: "en_us_002" },
          { name: "American EN - Male 1", value: "en_us_006" },
          { name: "American EN - Male 2", value: "en_us_007" },
          { name: "American EN - Male 3", value: "en_us_009" },
          { name: "American EN - Male 4", value: "en_us_010" },

          { name: "Singing - Alto", value: "en_female_f08_salut_damour" },
          { name: "Singing - Tenor", value: "en_male_m03_lobby" }
        )
    ),
  async execute(interaction, client) {
    await interaction.deferReply();

    const text = interaction.options
      .getString("text", true)
      .replace("+", "plus")
      .replace("&", "and");
    //   .replace(" ", "+");
    const voice = interaction.options.getString("voice");

    const { data } = await axios.post<TTSResponse>(
      "https://tiktok-tts.weilnet.workers.dev/api/generation",
      { text, voice }
    );

    const att = new AttachmentBuilder(Buffer.from(data.data, "base64"), {
      name: "tiktok_tts.mp3",
    });

    interaction.editReply({ content: "Slayed!", files: [att] });
  },
};
