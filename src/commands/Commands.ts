import SlayCommand from "../Structs/SlayCommand";

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

export const Commands: SlayCommand[] = [
  // Basic commands
  Ping,
  InviteCommand,
  TimeCommand,
  SayCommand,
  InfoCommand,

  // Radio commands
  Slay,
  NowPlayingCommand,
  StopCommand,

  // Last.fm commands
  FMCommand,
  SetCommand,

  // Spotify
  LoginCommand,
  SpotifyInfoCommand,
  SpotifyNowPlayingCommand,
];
