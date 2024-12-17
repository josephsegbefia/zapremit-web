import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

export const useGetCustomer = () => {
  const query = useQuery({
    queryKey: ["customer"],
    queryFn: async () => {
      const response = await client.api.customers["customer"].$get();

      if (!response.ok) {
        throw new Error("Failed to fetch customer");
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
