import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<
  (typeof client.api.recipients)[":recipientId"]["$patch"],
  200
>;

type RequestType = InferRequestType<
  (typeof client.api.recipients)[":recipientId"]["$patch"]
>;

export const useUpdateRecipient = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client.api.recipients[":recipientId"]["$patch"]({
        json,
        param,
      });

      if (!response.ok) {
        throw new Error("Failed to update recipient");
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Recipient data updated");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["recipients"] });
      queryClient.invalidateQueries({ queryKey: ["recipient", data.$id] });
    },
    onError: () => {
      toast.error("Failed to update recipient data");
    },
  });
  return mutation;
};
