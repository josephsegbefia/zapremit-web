import { CONVERTER_BASE_URL, CONVERTER_KEY } from "@/config";
import { Context } from "hono";

export type ExchangeRateData = {
  result: string;
  base_code: string;
  target_code: string;
  conversion_rate: number;
};

export type CachedItem = {
  data: ExchangeRateData;
  expiry: number;
};

const cache: Map<string, CachedItem> = new Map();

// Set cached data with a 2hour TTL use Redis for production
export const setCachedExchangeRate = (
  base: string,
  target: string,
  data: ExchangeRateData,
  ttl: number = 7200000
): void => {
  const key = `${base}-${target}`;
  cache.set(key, { data, expiry: Date.now() + ttl });
};

// Function to get cached data
export const getCachedExchangeRate = (
  base: string,
  target: string
): ExchangeRateData | null => {
  const key = `${base}-${target}`;
  const cachedItem = cache.get(key);

  if (cachedItem && Date.now() < cachedItem.expiry) {
    return cachedItem.data;
  }

  if (cachedItem) {
    cache.delete(key);
  }

  return null;
};

// Function to fetch data from the external API and update the cache
export const fetchAndUpdateCache = async (
  base: string,
  target: string,
  c: Context
) => {
  try {
    const apiResponse = await fetch(
      `${CONVERTER_BASE_URL}/${CONVERTER_KEY}/pair/${base}/${target}`
    );

    if (!apiResponse.ok) {
      return c.json(
        {
          error: "Failed to fetch conversion data",
          status: apiResponse.status,
        },
        500
      );
    }

    const apiResult = await apiResponse.json();
    if (apiResult.result !== "success") {
      return c.json(
        { error: "Could not fetch conversion data", details: apiResult },
        400
      );
    }

    // Update the cache
    setCachedExchangeRate(base, target, apiResult, 7200000); // Set TTL to 120 minutes

    return { data: apiResult, source: "api" };
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    throw new Error("Failed to fetch and update exchange rate");
  }
};

// Function to handle stale-while-revalidate logic
export const getExchangeRateWithRevalidate = async (
  base: string,
  target: string,
  c: Context
) => {
  const cachedData = getCachedExchangeRate(base, target);

  if (cachedData) {
    // Fetch fresh data in the background (non-blocking)
    fetchAndUpdateCache(base, target, c).catch((err) =>
      console.error("Background fetch failed:", err)
    );
    return c.json({ data: cachedData, source: "cache" });
  }

  // Otherwise, fetch fresh data and return it (blocking)
  const freshData = await fetchAndUpdateCache(base, target, c);
  return c.json(freshData);
};
