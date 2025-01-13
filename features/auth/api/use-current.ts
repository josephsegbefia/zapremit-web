import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";

export const useCurrent = () => {
  const router = useRouter();
  const query = useQuery({
    queryKey: ["current"],
    queryFn: async () => {
      const response = await client.api.auth.current.$get();

      if (!response.ok) {
        // return null;
        router.push("/sign-in");
      }

      const { data } = await response.json();

      return data;
    },
  });
  return query;
};
