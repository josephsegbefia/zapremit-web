import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<
  (typeof client.api)["transfer-details-storage"]["$post"],
  200
>;

type RequestType = InferRequestType<
  (typeof client.api)["transfer-details-storage"]["$post"]
>;

export const useCreateTransferConfirmation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api["transfer-details-storage"]["$post"]({
        json,
      });

      if (!response.ok) {
        throw new Error("Failed to create transfer confirmation");
      }
      return await response.json();
    },
    onSuccess: ({ data }) => {
      // router.push(`/playground/confirm-transfer?id=${data.$id}`);
      toast.success("Details collected");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return mutation;
};
