import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "lucide-react";
import { useCreateTransferModalRecipientPage } from "../hooks/use-create-transfer-modal-recipient-page";
import { useFetchRecipient } from "@/features/recipients/api/use-fetch-recipient";
import { DottedSeparator } from "@/components/shared-components/dotted-separator";
import Image from "next/image";
import { useGetCustomerOriginCountry } from "@/features/customers/api/use-get-customer-origin-country";
import { useGetCustomerBeneficiaryCountry } from "@/features/customers/api/use-get-customer-beneficiary-country";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { createTransferSchema } from "../schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useGetCustomer } from "@/features/customers/api/use-get-customer";
import { useGetActualRate } from "@/features/exchange/api/use-get-actual-rate";
import { useGetAdjustedExchangeRate } from "@/features/exchange/api/use-get-adjusted-exchange-rate";

interface CreateTransferFormRecipientPageprops {
  onCancel?: () => void;
}

export const CreateTransferFormRecipientPage = ({
  onCancel,
}: CreateTransferFormRecipientPageprops) => {
  const { recipientId } = useCreateTransferModalRecipientPage();
  const { data: recipient, isLoading: isFetchingRecipient } =
    useFetchRecipient(recipientId);
  const {
    data: originCountry,
    isLoading: isLoadingOriginCountry,
    isFetching: isFetchingOriginCountry,
  } = useGetCustomerOriginCountry();
  const {
    data: beneficiaryCountry,
    isLoading: isLoadingBeneficiaryCountry,
    isFetching: isFetchingBeneficiaryCountry,
  } = useGetCustomerBeneficiaryCountry();

  const { data: customer, isLoading: isLoadingCustomer } = useGetCustomer();
  const base = originCountry?.currencyCode || "";
  const target = beneficiaryCountry?.currencyCode || "";

  const { data: exchangeRate, isLoading: isLoadingRate } = useGetActualRate({
    base,
    target,
  });

  const {
    data: adjustedExchangeRate,
    isLoading: isLoadingAdjustedExchangeRate,
  } = useGetAdjustedExchangeRate({ base, target });

  const form = useForm<z.infer<typeof createTransferSchema>>({
    resolver: zodResolver(
      createTransferSchema.omit({
        recipientId: true,
        customerId: true,
        adjustedExchangeRate: true,
        exchangeRate: true,
      })
    ),
    defaultValues: {
      sentAmount: 0,
      receivedAmount: 0,
      transferReason: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof createTransferSchema>) => {
    const finalValues = {
      ...values,
      recipientId: recipient?.$id,
      customerId: customer?.$id,
      adjustedExchangeRate: adjustedExchangeRate,
      exchangeRate: exchangeRate,
    };

    // Put mutate function here
  };

  const isBusy =
    isFetchingRecipient ||
    isLoadingOriginCountry ||
    isLoadingBeneficiaryCountry ||
    isFetchingBeneficiaryCountry ||
    isFetchingOriginCountry ||
    isLoadingCustomer ||
    isLoadingRate ||
    isLoadingAdjustedExchangeRate;

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
      <CardHeader className="flex py-5 px-7">
        <CardTitle className="text-xl font-bold font-work-sans text-teal-800">
          Send money to {recipient?.name}
          <p className="text-xs font-work-sans text-teal-700 font-medium">
            Fill the form below to make a transfer to {recipient?.name}
          </p>
        </CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-4">
        <div className="h-full flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row gap-2 justify-between">
            <div className="flex flex-col w-full">
              <label
                htmlFor="origin-country"
                className="text-xs font-work-sans font-semibold text-teal-800 mb-3"
              >
                Your country
              </label>
              <div className="relative flex justify-center items-center border border-gray-200 rounded-md bg-gray-50 px-1 py-2 w-full">
                <div className="absolute left-2">
                  <Image
                    src={originCountry?.flagImageUrl || ""}
                    alt="origin country"
                    width={20}
                    height={10}
                    className="mr-1 rounded-sm"
                  />
                </div>
                <input
                  id="origin-country"
                  value={originCountry?.name}
                  readOnly
                  disabled
                  className="pl-2 text-xs font-medium text-teal-800"
                />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label
                htmlFor="beneficiary-country"
                className="text-xs font-work-sans font-semibold text-teal-800 mb-3"
              >
                {recipient?.name}&apos;s country
              </label>
              <div className="relative flex justify-center items-center border border-gray-200 rounded-md bg-gray-50 px-1 py-2 w-full">
                <div className="absolute left-2">
                  <Image
                    src={beneficiaryCountry?.flagImageUrl || ""}
                    alt="origin country"
                    width={20}
                    height={10}
                    className="mr-1 rounded-sm"
                  />
                </div>
                <input
                  id="origin-country"
                  value={beneficiaryCountry?.name}
                  readOnly
                  disabled
                  className="pl-2 text-xs font-medium text-teal-800"
                />
              </div>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-y-4 mt-4">
                <div className="flex flex-col lg:flex-row gap-2 justify-between items-center">
                  <FormField
                    control={form.control}
                    name="sentAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-work-sans text-teal-800 font-medium">
                          You send
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-teal-800 font-work-sans font-semibold text-xs">
                              EUR
                            </span>
                            <Input type="number" {...field} />
                          </div>
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
