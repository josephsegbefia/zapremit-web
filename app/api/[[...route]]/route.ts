/* eslint-disable @typescript-eslint/no-unused-vars */
import { Hono } from "hono";
import { handle } from "hono/vercel";
import customers from "@/features/customers/server/route";
import auth from "@/features/auth/server/route";
import onboarding from "@/features/onboarding/server/route";
import exchange from "@/features/exchange/server/route";
import recipients from "@/features/recipients/server/route";
import transfers from "@/features/transfers/server/route";
import fees from "@/features/fees-and-promotions/server/route";
import storage from "@/features/transfer-details-storage/server/route";

const app = new Hono().basePath("/api");

const routes = app
  .route("/auth", auth)
  .route("/customers", customers)
  .route("/onboarding", onboarding)
  .route("/exchange", exchange)
  .route("/recipients", recipients)
  .route("/transfers", transfers)
  .route("/fees-and-promotions", fees)
  .route("/transfer-details-storage", storage);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
