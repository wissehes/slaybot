import SlayClient from "src/Structs/SlayClient";
import { v4 as uuid } from "uuid";

export default async function createSpotifyLoginURL(
  client: SlayClient,
  userId: string
) {
  const dbUser = await client.prisma.user.findFirst({
    where: { discordId: userId },
  });

  const dbWaitItem = await client.prisma.spotifyLoginWaiting.create({
    data: {
      user: {
        connectOrCreate: {
          create: { discordId: userId },
          where: { id: dbUser?.id || 0 },
        },
      },
      waitId: uuid(),
    },
  });

  return client.spotify.createAuthorizeURL(
    ["user-top-read", "user-read-private", "user-read-playback-state"],
    dbWaitItem.waitId
  );
}
