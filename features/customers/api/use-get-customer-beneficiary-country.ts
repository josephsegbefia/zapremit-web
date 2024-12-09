import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

export const useGetCustomerBeneficiaryCountry = () => {
  const query = useQuery({
    queryKey: ["customer-beneficiary-country"],
    queryFn: async () => {
      const response = await client.api.customers[
        "customer-beneficiary-country"
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
