/* eslint-disable @typescript-eslint/no-unused-vars */
import { Hono } from "hono";
import { handle } from "hono/vercel";
import customers from "@/features/customers/server/route";
import auth from "@/features/auth/server/route";
import onboarding from "@/features/onboarding/server/route";
import exchange from "@/features/exchange/server/route";
import recipients from "@/features/recipients/server/route";

const app = new Hono().basePath("/api");

const routes = app
  .route("/auth", auth)
  .route("/customers", customers)
  .route("/onboarding", onboarding)
  .route("/exchange", exchange)
  .route("/recipients", recipients);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
