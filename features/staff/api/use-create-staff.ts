import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<
  (typeof client.api.staff.createstaff)["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.staff.createstaff)["$post"]
>;

export const useCreateStaff = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const response = await client.api.staff.createstaff["$post"]({ form });

      if (!response.ok) {
        throw new Error("Failed to create staff");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Staff created!");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["current"] });
    },
    onError: () => {
      toast.error("Staff could not be created");
    },
  });

  return mutation;
};
