import SlayCommand from "../Structs/SlayCommand";

import { NowPlayingCommand } from "./Radio/NowPlaying";
import { StopCommand } from "./Radio/Stop";
import { Slay } from "./Radio/Slay";

import { InviteCommand } from "./Basic/Invite";
import { Ping } from "./Basic/ping";
import { SayCommand } from "./Basic/Say";
import { TimeCommand } from "./Basic/Time";

export const Commands: SlayCommand[] = [
  Ping,
  Slay,
  NowPlayingCommand,
  StopCommand,
  InviteCommand,
  TimeCommand,
  SayCommand,
];
