import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    POSTGRES_URL: z.string().url(),
    BLIZZARD_CLIENT_ID: z.string(),
    BLIZZARD_CLIENT_SECRET: z.string(),
    OAUTH_TOKEN_HOST: z.string().optional(),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {},
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    POSTGRES_URL: process.env.POSTGRES_URL,
    BLIZZARD_CLIENT_ID: process.env.BLIZZARD_CLIENT_ID,
    BLIZZARD_CLIENT_SECRET: process.env.BLIZZARD_CLIENT_SECRET,
    OAUTH_TOKEN_HOST: process.env.OAUTH_TOKEN_HOST,
  },
});
