import SlayCommand from "src/Structs/SlayCommand";
import { InviteCommand } from "./Invite";

import { NowPlayingCommand } from "./NowPlaying";
import { Ping } from "./ping";
import { SayCommand } from "./Say";
import { Slay } from "./Slay";
import { StopCommand } from "./Stop";
import { TimeCommand } from "./Time";

export const Commands: SlayCommand[] = [
  Ping,
  Slay,
  NowPlayingCommand,
  StopCommand,
  InviteCommand,
  TimeCommand,
  SayCommand,
];
