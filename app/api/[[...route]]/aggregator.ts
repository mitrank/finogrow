import { plaidClient } from "@/lib/plaid";
import { clerkMiddleware } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { CountryCode, Products } from "plaid";
import { z } from "zod";

const app = new Hono()
  .post(
    "/create-link-token",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        name: z.string(),
        id: z.string(),
      })
    ),
    async (c) => {
      const values = c.req.valid("json");

      const tokenParams = {
        user: {
          client_user_id: values.id,
        },
        client_name: values.name,
        products: ["auth"] as Products[],
        language: "en",
        country_codes: ["US"] as CountryCode[],
      };

      const response = await plaidClient.linkTokenCreate(tokenParams);

      return c.json({ linkToken: response.data.link_token });
    }
  )
  .post(
    "/exchange-public-token",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        publicToken: z.string(),
      })
    ),
    async (c) => {
      const values = c.req.valid("json");

      const response = await plaidClient.itemPublicTokenExchange({
        public_token: values.publicToken,
      });
      const accessToken = response.data.access_token;

      const accountsResponse = await plaidClient.accountsGet({
        access_token: accessToken,
      });

      const accountsData = accountsResponse.data.accounts;

      return c.json({ publicTokenExchange: "complete", accountsData });
    }
  );
export default app;
