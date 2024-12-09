import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

export const useGetCustomerOriginCountry = () => {
  const query = useQuery({
    queryKey: ["customer-origin-country"],
    queryFn: async () => {
      const response = await client.api.customers[
        "customer-origin-country"
      ].$get();

      if (!response.ok) {
        throw new Error("Failed to fetch customer beneficiary country");
      }

      const { data } = await response.json();

      return data;
    },
  });
  return query;
};
