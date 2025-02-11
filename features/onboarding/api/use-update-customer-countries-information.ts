import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client.api.onboarding)["update-customer-countries-info"][":customerId"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.onboarding)["update-customer-countries-info"][":customerId"]["$patch"]
>;

export const useUpdateCustomerCountriesInformation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client.api.onboarding[
        "update-customer-countries-info"
      ][":customerId"]["$patch"]({ json, param });

      if (!response.ok) {
        throw new Error("Failed to update the customer");
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Customer countries information added");
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["customer", data.$id] });
    },
    onError: () => {
      toast.error("Failed to add personal data");
    },
  });
  return mutation;
};
