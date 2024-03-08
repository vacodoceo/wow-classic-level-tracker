import { ClientCredentials } from "simple-oauth2";

const client = new ClientCredentials({
  client: {
    id: process.env.BLIZZARD_CLIENT_ID as string,
    secret: process.env.BLIZZARD_CLIENT_SECRET as string,
  },
  auth: {
    tokenHost: process.env.OAUTH_TOKEN_HOST || "https://us.battle.net",
  },
});

export const getToken = async (): Promise<string> => {
  const accessToken = await client.getToken({ scope: "wow.profile" });
  const access_token = accessToken.token.access_token;

  return access_token as string;
};
