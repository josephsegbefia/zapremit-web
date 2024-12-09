import { useQueryClient } from "@tanstack/react-query";

export const useInvalidateBeneficiaryCountry = () => {
  const queryClient = useQueryClient();

  const invalidateBeneficiaryCountry = () => {
    queryClient.invalidateQueries({
      queryKey: ["customer-beneficiary-country"],
    });
  };

  return { invalidateBeneficiaryCountry };
};
