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

export const Commands: SlayCommand[] = [
  // Basic commands
  Ping,
  InviteCommand,
  TimeCommand,
  SayCommand,

  // Radio commands
  Slay,
  NowPlayingCommand,
  StopCommand,

  // Last.fm commands
  FMCommand,
  SetCommand,
];
