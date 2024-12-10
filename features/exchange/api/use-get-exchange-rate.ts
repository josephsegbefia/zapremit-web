import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

type ExchangeRateParams = {
  base: string;
  target: string;
};

export const useGetExchangeRate = (params: ExchangeRateParams) => {
  const query = useQuery({
    queryKey: ["get-exchange-rate", params],
    queryFn: async () => {
      const response = await client.api.exchange["get-exchange-rate"][":base"][
        ":target"
      ].$get({ param: params }); // Pass the 'params' object here

      if (!response.ok) {
        throw new Error("Failed to fetch exchange rate");
      }

      const data = await response.json();

      return data;
    },
  });

  return query;
};
