import SlayCommand, { SlayCommandGroup } from "../Structs/SlayCommand";

import { NowPlayingCommand } from "./Radio/NowPlaying";
import { StopCommand } from "./Radio/Stop";
import { Slay } from "./Radio/Slay";

import { InviteCommand } from "./Basic/Invite";
import { Ping } from "./Basic/ping";
import { SayCommand } from "./Basic/Say";
import { TimeCommand } from "./Basic/Time";
import { FMCommand } from "./LastFM/FM";
import { SetCommand } from "./LastFM/Set";
import { InfoCommand } from "./Basic/Info";
import { LoginCommand } from "./Spotify/Login";
import { SpotifyInfoCommand } from "./Spotify/SpotifyInfo";
import { SpotifyNowPlayingCommand } from "./Spotify/SpotifyNP";
import { HelpCommand } from "./Basic/Help";
import { CollageCommand } from "./LastFM/Collage";
import { RequestCommand } from "./Radio/Request";
import { TikTokTTSCommand } from "./Slay/TikTok_TTS";

export const CommandGroups: SlayCommandGroup[] = [
  {
    name: "Basic Commands",
    commands: [
      Ping,
      InviteCommand,
      TimeCommand,
      SayCommand,
      InfoCommand,
      HelpCommand,
    ],
  },
  {
    name: "Radio Commands",
    commands: [Slay, NowPlayingCommand, StopCommand, RequestCommand],
  },
  {
    name: "Last.fm Commands",
    commands: [FMCommand, SetCommand, CollageCommand],
  },
  {
    name: "Spotify Commands",
    commands: [LoginCommand, SpotifyInfoCommand, SpotifyNowPlayingCommand],
  },
  {
    name: "Slay Commands",
    commands: [TikTokTTSCommand],
  },
];

export const Commands: SlayCommand[] = [];

for (const commandgroup of CommandGroups) {
  for (const command of commandgroup.commands) {
    Commands.push(command);
  }
}
