import { ClientCredentials } from "simple-oauth2";
import { env } from "@/env";

const client = new ClientCredentials({
  client: {
    id: env.BLIZZARD_CLIENT_ID,
    secret: env.BLIZZARD_CLIENT_SECRET,
  },
  auth: {
    tokenHost: env.OAUTH_TOKEN_HOST || "https://us.battle.net",
  },
});

export const getToken = async (): Promise<string> => {
  const accessToken = await client.getToken({ scope: "wow.profile" });
  const access_token = accessToken.token.access_token;

  return access_token as string;
};
