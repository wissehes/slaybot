import { AudioPlayer, createAudioPlayer } from "@discordjs/voice";
import { PrismaClient } from "@prisma/client";
import { Client, ClientOptions, Collection } from "discord.js";
import SpotifyWebApi from "spotify-web-api-node";
import { webServer } from "../web/web";
import { Commands } from "../commands/Commands";
import SlayCommand from "./SlayCommand";
import axios, { AxiosInstance } from "axios";

export default class SlayClient extends Client {
  constructor(options: ClientOptions) {
    super(options);
    this.commands = new Collection();
    this.prisma = new PrismaClient();
    this.spotify = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENTID,
      clientSecret: process.env.SPOTIFY_CLIENTSECRET,
      redirectUri: process.env.SPOTIFY_CALLBACK,
    });

    this.players = new Collection();
    this.azura = axios.create({
      baseURL: "https://radio.smarthome.wissehes.nl/api",
      headers: { "X-API-Key": process.env.AZURA_API as string },
    });

    this.lastfm = axios.create({
      baseURL: "http://ws.audioscrobbler.com/2.0/",
      params: { api_key: process.env.LASTFMAPI as string, format: "json" },
    });

    for (const command of Commands) {
      this.commands.set(command.data.name, command);
    }

    webServer(this);
  }

  commands: Collection<string, SlayCommand>;
  prisma: PrismaClient;
  spotify: SpotifyWebApi;

  azura: AxiosInstance;
  lastfm: AxiosInstance;

  players: Collection<string, AudioPlayer>;
}
