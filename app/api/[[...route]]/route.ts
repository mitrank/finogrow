import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app
  .get("/hello", (c) => {
    return c.json({
      message: "Hello Next.js!",
    });
  })
  .get("/hello/:id", (c) => {
    return c.json({
      message: "New ID API!",
      id: c.req.param("id"),
    });
  });

export const GET = handle(app);
export const POST = handle(app);
