import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { getExchangeRateWithRevalidate } from "../utils";

const app = new Hono().get(
  "/get-exchange-rate/:base/:target",
  sessionMiddleware,
  zValidator(
    "param",
    z.object({
      base: z.string().regex(/^[A-Z]{3}$/),
      target: z.string().regex(/^[A-Z]{3}$/),
    })
  ),
  async (c) => {
    try {
      const { base, target } = c.req.param();
      return await getExchangeRateWithRevalidate(base, target, c);
    } catch (error) {
      console.error("Error in exchange rate route", error);
      return c.json({ error: "Internal Server Error" }, 500);
    }
  }
);

export default app;
