import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

export const useGetRecipients = () => {
  const query = useQuery({
    queryKey: ["recipients"],
    queryFn: async () => {
      const response = await client.api.recipients.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch recipients");
      }

      const { data } = await response.json();

      return data;
    },
  });
  return query;
};
