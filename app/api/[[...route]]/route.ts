import { Hono } from "hono";
import { handle } from "hono/vercel";
import accounts from "./accounts";
import categories from "./categories";
import transactions from "./transactions";
import summary from "./summary";
import aggregator from "./aggregator";
import budget from "./budget";

export const runtime = "edge";

const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("accounts", accounts)
  .route("categories", categories)
  .route("transactions", transactions)
  .route("summary", summary)
  .route("aggregator", aggregator)
  .route("budget", budget);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
