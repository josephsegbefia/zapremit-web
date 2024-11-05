import { Hono } from "hono";
import { handle } from "hono/vercel";
import customers from "@/features/customers/server/route";
import auth from "@/features/auth/server/route";
import staff from "@/features/staff/server/route";

const app = new Hono().basePath("/api");

const routes = app
  .route("/auth", auth)
  .route("/customers", customers)
  .route("/staff", staff);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
