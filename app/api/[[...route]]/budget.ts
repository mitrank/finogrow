import { db } from "@/db/drizzle";
import { budget, insertBudgetSchema } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const [data] = await db
      .select({
        id: budget.id,
        amount: budget.amount,
      })
      .from(budget)
      .where(eq(budget.userId, auth.userId));

    if (!data) {
      return c.json({ error: "Budget not found for this user." }, 500);
    }

    return c.json({ data });
  })
  .post(
    "/create-budget",
    clerkMiddleware(),
    zValidator(
      "json",
      insertBudgetSchema.pick({
        amount: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const [data] = await db
        .insert(budget)
        .values({
          id: createId(),
          amount: values.amount,
          userId: auth.userId,
        })
        .returning();

      return c.json({ data });
    }
  )
  .patch(
    "/edit-budget/:id",
    clerkMiddleware(),
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    zValidator(
      "json",
      insertBudgetSchema.pick({
        amount: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      if (!id) {
        return c.json({ error: "Missing Budget ID" }, 400);
      }

      const [data] = await db
        .update(budget)
        .set(values)
        .where(and(eq(budget.userId, auth.userId), eq(budget.id, id)))
        .returning();

      if (!data) {
        return c.json({ error: "Budget not updated for this user." }, 500);
      }

      return c.json({ data });
    }
  );

export default app;
