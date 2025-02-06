import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

export const useGetTransferFee = () => {
  const query = useQuery({
    queryKey: ["transfer-fee"],
    queryFn: async () => {
      const response = await client.api["fees-and-promotions"][
        "transfer-fee"
      ].$get();

      if (!response.ok) {
        throw new Error("Cannot fetch transfer fee at this time");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
