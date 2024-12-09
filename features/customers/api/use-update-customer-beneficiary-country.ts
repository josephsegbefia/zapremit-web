import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<
  (typeof client.api.customers)["update-customer-beneficiary-country"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.customers)["update-customer-beneficiary-country"]["$patch"]
>;

export const useUpdateCustomerBeneficiaryCountry = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.customers[
        "update-customer-beneficiary-country"
      ]["$patch"]({ json });

      if (!response.ok) {
        throw new Error("Failed to update the benficiary country");
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Beneficiary country updated");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["customer", data.$id] });
    },
    onError: () => {
      toast.error("Failed to update beneficiary country");
    },
  });
  return mutation;
};
