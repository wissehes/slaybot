import { AudioPlayer, createAudioPlayer } from "@discordjs/voice";
import { Client, ClientOptions, Collection } from "discord.js";
import { Commands } from "../commands/Commands";
import SlayCommand from "./SlayCommand";

export default class SlayClient extends Client {
  constructor(options: ClientOptions) {
    super(options);
    this.commands = new Collection();
    this.players = new Collection();

    this.player = createAudioPlayer();

    for (const command of Commands) {
      this.commands.set(command.data.name, command);
    }
  }

  commands: Collection<string, SlayCommand>;
  players: Collection<string, AudioPlayer>;
  player: AudioPlayer;
}
