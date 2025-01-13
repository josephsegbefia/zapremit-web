import { useFetchRecipient } from "@/features/recipients/api/use-fetch-recipient";
import { useCreateTransferModalRecipientPage } from "../hooks/use-create-transfer-modal-recipicient-page";
import { useCreateTransfer } from "../api/use-create-transfer";
import { createTransferSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "@/components/shared-components/dotted-separator";
import { ArrowRight, Loader } from "lucide-react";
import { useGetCustomerBeneficiaryCountry } from "@/features/customers/api/use-get-customer-beneficiary-country";
import { useGetCustomerOriginCountry } from "@/features/customers/api/use-get-customer-origin-country";
import { useGetExchangeRate } from "@/features/exchange/api/use-get-exchange-rate";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

interface CreateTransferFormRecipientPageProps {
  onCancel?: () => void;
}
export const CreateTransferFormRecipientPage = ({
  onCancel,
}: CreateTransferFormRecipientPageProps) => {
  const { recipientId } = useCreateTransferModalRecipientPage();
  const { data, isLoading, error } = useFetchRecipient(recipientId);
  const { mutate, isPending } = useCreateTransfer();
  const {
    data: beneficiaryCountry,
    isLoading: isLoadingBeneficiaryCountry,
    isFetching: isFetchingBeneficiaryCountry,
  } = useGetCustomerBeneficiaryCountry();

  const {
    data: originCountry,
    isLoading: isLoadingOriginCountry,
    isFetching: isFetchingOriginCountry,
  } = useGetCustomerOriginCountry();

  const base = originCountry?.currenyCode || "EUR";
  const target = beneficiaryCountry?.currencyCode || "GHS";

  const { data: exchangeRate, isLoading: isLoadingRate } = useGetExchangeRate({
    base,
    target,
  });

  const isBusy =
    isLoadingBeneficiaryCountry ||
    isFetchingBeneficiaryCountry ||
    isLoadingOriginCountry ||
    isFetchingOriginCountry ||
    isLoadingRate;

  const form = useForm<z.infer<typeof createTransferSchema>>({
    resolver: zodResolver(createTransferSchema),
  });

  const onSubmit = (values: z.infer<typeof createTransferSchema>) => {
    const finalValues = {
      ...values,
    };

    mutate(
      { json: finalValues },
      {
        onSuccess: () => {
          if (onCancel) {
            onCancel();
          }
        },
      }
    );
  };

  if (isBusy) {
    return (
      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex justify-center items-center mb-3">
            <Loader className="w-6 h-6 animate-spin text-teal-800" />
          </div>
          <p className="text-teal-800 text-sm text-center font-work-sans">
            Loading data, please wait...
          </p>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold font-work-sans text-teal-800">
          {`Transfer to ${data?.name}`}
        </CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-4">
        <div className="h-full flex flex-col overflow-auto p-1">
          <div className="flex flex-row gap-2 lg:flex-row justify-between items-center">
            <div>
              <label
                htmlFor="origin-country"
                className="text-sm font-work-sans font-semibold text-teal-800"
              >
                Sending from
              </label>
              <div className="relative flex justify-center items-center border border-gray-200 rounded-md bg-gray-100 px-2 py-3">
                <div className="absolute left-2">
                  <Image
                    src={originCountry?.flagImageUrl || ""}
                    alt="origin country"
                    width={30}
                    height={20}
                    className="mr-2 rounded-sm"
                  />
                </div>
                <input
                  id="origin-country"
                  value={originCountry?.name}
                  readOnly
                  disabled
                  className="pl-10 text-sm font-semibold text-teal-800"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="beneficiary-country"
                className="text-sm font-work-sans font-semibold text-teal-800"
              >
                Sending to
              </label>
              <div className="relative flex justify-center items-center border border-gray-200 rounded-md bg-gray-100 px-2 py-3">
                <div className="absolute left-2">
                  <Image
                    src={beneficiaryCountry?.flagImageUrl || ""}
                    alt="beneficiary country"
                    width={30}
                    height={20}
                    className="mr-2 rounded-sm"
                  />
                </div>
                <input
                  id="origin-country"
                  value={beneficiaryCountry?.name}
                  readOnly
                  disabled
                  className="pl-10 text-sm font-semibold text-teal-800"
                />
              </div>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-y-4 mt-4">
                <div className="flex flex-row gap-2 lg:flex-row justify-between items-center">
                  <FormField
                    control={form.control}
                    name="sentAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-work-sans text-teal-800">
                          You send
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g 20"
                            {...field}
                            disabled={isPending}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="receivedAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-work-sans text-teal-800">
                          They receive
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g 20"
                            {...field}
                            disabled={isPending}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};
