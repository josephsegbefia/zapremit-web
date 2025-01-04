import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

export const useFetchRecipient = (recipientId: string) => {
  const query = useQuery({
    queryKey: ["recipient", recipientId],
    queryFn: async () => {
      if (!recipientId) {
        throw new Error("Recipient ID is required");
      }

      const response = await client.api.recipients.recipients[
        ":recipientId"
      ].$get({ param: { recipientId: recipientId } });
      // path: `/${recipientId}`, // Append the recipientId to t);

      if (!response.ok) {
        throw new Error("Failed to fetch recipient");
      }

      const { data } = await response.json();

      return data;
    },
    enabled: !!recipientId, // Ensure the query only runs if recipientId is provided
  });

  return query;
};
