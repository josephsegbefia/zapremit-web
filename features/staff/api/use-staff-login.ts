import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<
  (typeof client.api.staff.stafflogin)["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.staff.stafflogin)["$post"]
>;

export const useStaffLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.staff.stafflogin["$post"]({ json });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Login successful. Have a good day at work");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["current"] });
    },
    onError: () => {
      toast.error("Login failed");
    },
  });

  return mutation;
};
