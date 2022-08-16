import SlayClient from "src/Structs/SlayClient";
import express from "express";

export async function webServer(client: SlayClient) {
  const app: express.Application = express();
  const port = 3000;

  app.get("/spotify/callback", async (req, res) => {
    if (!req.query["code"] || !req.query["state"]) {
      res.send("no code.");
      return;
    }

    const dbWaitItem = await client.prisma.spotifyLoginWaiting.findFirst({
      where: { waitId: req.query["state"].toString() },
      select: { id: true, user: true, userId: true, waitId: true },
    });

    if (!dbWaitItem) {
      res.send("invalid.");
      return;
    }

    client.spotify
      .authorizationCodeGrant(req.query["code"].toString())
      .then(async (data) => {
        const access_token = data.body["access_token"];
        const refresh_token = data.body["refresh_token"];
        const expirationDate = new Date();
        expirationDate.setSeconds(
          expirationDate.getSeconds() + data.body["expires_in"]
        );

        await client.prisma.user.update({
          where: { id: dbWaitItem.user.id },
          data: {
            spotifyAccessToken: access_token,
            spotifyRefreshToken: refresh_token,
            spotifyExpires: expirationDate,
          },
        });

        await client.users.cache
          .get(dbWaitItem.user.discordId)
          ?.send("Successfully connected your spotify!");

        client.spotify.setAccessToken(access_token);
        client.spotify.setRefreshToken(refresh_token);
        client.spotify
          .getMyTopArtists({ time_range: "long_term" })
          .then((data) => {
            const topartist = data.body.items[0];
            res.send(
              `So your top artist is ${topartist.name}... Interesting. Anyways, thank you for connecting your Spotify account!`
            );
          });

        client.spotify.resetAccessToken();
        client.spotify.resetRefreshToken();
        await client.prisma.spotifyLoginWaiting.delete({
          where: { id: dbWaitItem.id },
        });
      })
      .catch(async (error) => {
        if (dbWaitItem) {
          await client.prisma.spotifyLoginWaiting.delete({
            where: { id: dbWaitItem.id },
          });
        }
      });
  });

  app.listen(port, () => console.log("Webserver running"));
}
