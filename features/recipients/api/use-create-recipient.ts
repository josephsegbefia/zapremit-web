import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client.api.recipients)["recipients"]["$post"],
  200
>;

type RequestType = InferRequestType<
  (typeof client.api.recipients)["recipients"]["$post"]
>;

export const useCreateRecipient = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.recipients["recipients"]["$post"]({
        json,
      });

      if (!response.ok) {
        throw new Error("Failed to create customer profile. Contact support");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Recipient created");
      queryClient.invalidateQueries({ queryKey: ["recipients"] });
    },
    onError: () => {
      toast.error("Failed to create recipient, please contact support");
    },
  });

  return mutation;
};
