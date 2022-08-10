import axios from "axios";
import { getLastfmTracksResponse } from "src/types/LastfmNPResponse";

/**
 * Gets a user's recent tracks
 * @param user the username
 */
export default async function getLastfmRecents(
  user: string
): Promise<getLastfmTracksResponse> {
  const apikey = process.env.LASTFMAPI as string;

  const { data } = await axios.get<getLastfmTracksResponse>(
    `http://ws.audioscrobbler.com/2.0/`,
    {
      params: {
        method: "user.getrecenttracks",
        user,
        api_key: apikey,
        format: "json",
      },
    }
  );

  return data;
}
