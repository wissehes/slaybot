import { User } from "@prisma/client";
import SlayClient from "src/Structs/SlayClient";

export default async function getOrRefreshAccessToken(
  user: User,
  client: SlayClient
) {
  const { spotify, prisma } = client;

  const accesToken = user.spotifyAccessToken;
  const refreshToken = user.spotifyRefreshToken;
  const expirationDate = user.spotifyExpires;

  if (!accesToken || !refreshToken || !expirationDate) {
    return;
  }

  if (new Date().getTime() > expirationDate.getTime()) {
    console.log("refreshing accesstoken...");
    const { body: data } = await spotify.refreshAccessToken();
    const expirationDate = new Date();
    expirationDate.setSeconds(expirationDate.getSeconds() + data["expires_in"]);

    client.spotify.setAccessToken(data.access_token);
    await client.prisma.user.update({
      where: { id: user.id },
      data: {
        spotifyAccessToken: data.access_token,
        spotifyExpires: expirationDate,
      },
    });
  } else {
    client.spotify.setAccessToken(accesToken);
  }
}
