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

  const mutation = useMutation<ResponseType, { message: string }, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.recipients["recipients"]["$post"]({
        json,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error(
          // errorData.error || "Failed to create recipient. Contact support"
          "Failed to create recipient. Contact support"
        );
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Recipient created");
      queryClient.invalidateQueries({ queryKey: ["recipients"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
