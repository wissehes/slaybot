import { ChannelType, SlashCommandBuilder, TextChannel } from "discord.js";
import SlayCommand from "src/Structs/SlayCommand";

export const SayCommand: SlayCommand = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Make me say something xx (owner only)")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel for the text")
        // .addChannelTypes(
        //   ChannelType.GuildText |
        //     ChannelType.GuildNews |
        //     ChannelType.GuildNewsThread
        // )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("text").setDescription("The text to say").setRequired(true)
    ),
  async execute(interaction, client) {
    if (interaction.user.id !== process.env.OWNERID) {
      interaction.reply({ content: "no x", ephemeral: true });
      return;
    }
    const channel = interaction.options.getChannel(
      "channel",
      true
    ) as TextChannel;

    if (!channel.isTextBased) {
      interaction.reply({
        content: "that isn't a text channel x",
        ephemeral: true,
      });
      return;
    }
    const text = interaction.options.getString("text", true);
    // const client.channels.cache.get(channel?.id || "") as TextChannel
    await channel.send(text);
    await interaction.reply({ content: "slayed!", ephemeral: true });
  },
};
