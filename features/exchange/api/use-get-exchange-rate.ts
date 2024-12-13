import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

type ExchangeRateParams = {
  base: string;
  target: string;
};

type ExchangeRateResponse = {
  conversion_rate?: number;
  error?: string;
};

export const useGetExchangeRate = (params: ExchangeRateParams) => {
  const query = useQuery({
    queryKey: ["get-exchange-rate", params],
    queryFn: async (): Promise<number> => {
      const response = await client.api.exchange["get-exchange-rate"][":base"][
        ":target"
      ].$get({ param: params });

      // Parse the JSON response
      const json: ExchangeRateResponse = await response.json();

      // Handle error case
      if (json.error) {
        throw new Error(json.error);
      }

      // Return the conversion rate
      if (json.conversion_rate !== undefined) {
        return json.conversion_rate;
      }

      throw new Error("Unexpected response structure");
    },
  });

  return query;
};
