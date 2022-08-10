import axios from "axios";
import { getNowPlayingResponse } from "../types/AzuraNPResponse";

export default async function getNowPlaying(): Promise<getNowPlayingResponse> {
  const { data, status } = await axios.get<getNowPlayingResponse>(
    "https://radio.smarthome.wissehes.nl/api/nowplaying/1"
  );
  return data;
}
