import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client.api.recipients)[":recipientId"]["$delete"],
  200
>;

type RequestType = InferRequestType<
  (typeof client.api.recipients)[":recipientId"]["$delete"]
>;

export const useDeleteRecipient = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.recipients[":recipientId"]["$delete"]({
        param,
      });

      if (!response.ok) {
        throw new Error("Failed to delete recipient");
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Recipient deleted");
      queryClient.invalidateQueries({ queryKey: ["recipients"] });
      queryClient.invalidateQueries({ queryKey: ["recipient", data.$id] });
    },
    onError: () => {
      toast.error("Failed to delete recipient");
    },
  });
  return mutation;
};
