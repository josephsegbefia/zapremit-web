import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

export const useFetchRecipient = (recipientId: string) => {
  const query = useQuery({
    queryKey: ["recipient", recipientId],
    queryFn: async () => {
      if (!recipientId) {
        throw new Error("Recipient ID is required");
      }

      const response = await client.api.recipients[":recipientId"].$get({
        param: { recipientId: recipientId },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recipient");
      }

      const { data } = await response.json();

      return data;
    },
    enabled: !!recipientId,
  });

  return query;
};
