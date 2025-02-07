import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

export const useGetTransferConfirmation = (confirmationId: string) => {
  const query = useQuery({
    queryKey: ["confirmation", confirmationId],
    queryFn: async () => {
      const response = await client.api["transfer-details-storage"][
        "temp-store"
      ].$get({ query: { confirmationId } });

      if (!response.ok) {
        throw new Error("Failed to fetch transfer confirmation details");
      }

      const { data } = await response.json();

      return data;
    },
    enabled: !!confirmationId,
  });
  return query;
};
