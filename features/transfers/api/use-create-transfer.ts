import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client.api.transfers)["$post"],
  200
>;

type RequestType = InferRequestType<(typeof client.api.transfers)["$post"]>;

export const useCreateTransfer = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, { message: string }, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.transfers["$post"]({ json });

      if (!response.ok) {
        throw new Error("Failed to initiate transfer, try again later");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Transfer initiated");
      queryClient.invalidateQueries({ queryKey: ["transfers"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
