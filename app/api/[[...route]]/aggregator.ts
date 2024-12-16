import { db } from "@/db/drizzle";
import { accounts } from "@/db/schema";
import { plaidClient } from "@/lib/plaid";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { and, eq, inArray, isNotNull } from "drizzle-orm";
import { Hono } from "hono";
import { CountryCode, Products } from "plaid";
import { z } from "zod";

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const data = await db
      .select({
        id: accounts.plaidId,
        name: accounts.name,
      })
      .from(accounts)
      .where(
        and(eq(accounts.userId, auth.userId), isNotNull(accounts.plaidId))
      );

    return c.json({ data });
  })
  .post(
    "/create-link-token",
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
    "/link-account",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        publicToken: z.string(),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const response = await plaidClient.itemPublicTokenExchange({
        public_token: values.publicToken,
      });
      const accessToken = response.data.access_token;

      const accountsResponse = await plaidClient.accountsGet({
        access_token: accessToken,
      });

      const accountsData = accountsResponse.data.accounts;

      await Promise.all(
        accountsData.map((account) =>
          db
            .insert(accounts)
            .values({
              id: createId(),
              userId: auth.userId,
              plaidId: account.persistent_account_id,
              name: account.name,
            })
            .returning()
        )
      );

      return c.json({ publicTokenExchange: "complete", accountsData });
    }
  )
  .post(
    "/unlink-account",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        ids: z.array(z.string()),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await db
        .delete(accounts)
        .where(
          and(
            eq(accounts.userId, auth.userId),
            inArray(accounts.plaidId, values.ids)
          )
        )
        .returning({
          id: accounts.plaidId,
        });

      return c.json({ data });
    }
  );

export default app;
