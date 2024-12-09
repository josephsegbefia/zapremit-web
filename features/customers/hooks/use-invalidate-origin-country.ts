import { useQueryClient } from "@tanstack/react-query";

export const useInvalidateOriginCountry = () => {
  const queryClient = useQueryClient();

  const invalidateOriginCountry = () => {
    queryClient.invalidateQueries({
      queryKey: ["customer-origin-country"],
    });
  };

  return { invalidateOriginCountry };
};
