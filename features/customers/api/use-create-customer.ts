import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client.api.customers)["create-customer-profile"]["$post"],
  200
>;

type RequestType = InferRequestType<
  (typeof client.api.customers)["create-customer-profile"]["$post"]
>;

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.customers["create-customer-profile"][
        "$post"
      ]({ json });

      if (!response.ok) {
        throw new Error("Failed to create customer profile. Contact support");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Customer profile created");
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: () => {
      toast.error("Failed to create customer profile, please contact support");
    },
  });

  return mutation;
};
