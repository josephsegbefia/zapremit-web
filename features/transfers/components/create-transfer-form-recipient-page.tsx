/* eslint-disable react-hooks/exhaustive-deps */
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
  FormMessage,
} from "@/components/ui/form";
import { createTransferSchema } from "../schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useGetActualRate } from "@/features/exchange/api/use-get-actual-rate";
import { useGetAdjustedExchangeRate } from "@/features/exchange/api/use-get-adjusted-exchange-rate";
import { useEffect, useState } from "react";
import { useCreateTransfer } from "../api/use-create-transfer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TRANSFER_REASONS = [
  { reason: "Family & Friends Support", value: "FAMILY_AND_FRIENDS_SUPPORT" },
  {
    reason: "Payment for goods or services",
    value: "PAYMENT_FOR_GOODS_AND_SERVICES",
  },
  { reason: "Donations", value: "DONATIONS" },
  { reason: "Savings", value: "SAVINGS" },
];

interface CreateTransferFormRecipientPageprops {
  onCancel?: () => void;
}

export const CreateTransferFormRecipientPage = ({
  onCancel,
}: CreateTransferFormRecipientPageprops) => {
  // Essential: mutation function
  const { mutate, isPending } = useCreateTransfer();

  // Essential component states
  const [baseCurrency, setBaseCurrency] = useState<number | null>(null);
  const [targetCurrency, setTargetCurrency] = useState<number | null>(null);
  const [debounceBase, setDebounceBase] = useState<number | null>(null);
  const [debounceTarget, setDebounceTarget] = useState<number | null>(null);

  // End of the states

  // Required values
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

  // End of required Values

  const form = useForm<z.infer<typeof createTransferSchema>>({
    resolver: zodResolver(
      createTransferSchema.omit({
        recipientId: true,
        exchangeRate: true,
        adjustedExchangeRate: true,
      })
    ),
    defaultValues: {
      sentAmount: 0, // Set a default value to avoid validation errors
      receivedAmount: 0,
      transferReason: "DONATIONS",
    },
  });

  const isBusy =
    isFetchingRecipient ||
    isLoadingOriginCountry ||
    isLoadingBeneficiaryCountry ||
    isFetchingBeneficiaryCountry ||
    isFetchingOriginCountry ||
    isLoadingRate ||
    isLoadingAdjustedExchangeRate;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceBase(baseCurrency);
    }, 500);

    return () => clearTimeout(timer);
  }, [baseCurrency]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceTarget(targetCurrency);
    }, 500);

    return () => clearTimeout(timer);
  }, [targetCurrency]);

  useEffect(() => {
    if (debounceBase !== null && adjustedExchangeRate) {
      const convertedTarget = (debounceBase * adjustedExchangeRate).toFixed(2);
      setTargetCurrency(parseFloat(convertedTarget));
    }
  }, [debounceBase, adjustedExchangeRate]);

  useEffect(() => {
    if (debounceTarget !== null && adjustedExchangeRate) {
      if (adjustedExchangeRate) {
        const convertedBase = (debounceTarget / adjustedExchangeRate).toFixed(
          2
        );

        setBaseCurrency(parseFloat(convertedBase));
      }
    }
  }, [debounceTarget, adjustedExchangeRate]);

  // const handleBaseCurrencyChange = (value: number) => {
  //   setBaseCurrency(value);
  //   if (!value) {
  //     setTargetCurrency(0);
  //   }
  // };

  const handleBaseCurrencyChange = (value: number) => {
    setBaseCurrency(value);
    setTimeout(() => form.setValue("sentAmount", value), 0);
  };

  // const handleTargetCurrencyChange = (value: number) => {
  //   setTargetCurrency(value);
  //   if (!value) {
  //     setBaseCurrency(0);
  //   }
  // };

  const handleTargetCurrencyChange = (value: number) => {
    setTargetCurrency(value);
    setTimeout(() => form.setValue("receivedAmount", value), 0);
  };

  useEffect(() => {
    console.log(baseCurrency, targetCurrency);
  }, [baseCurrency, targetCurrency]);

  const onSubmit = (values: z.infer<typeof createTransferSchema>) => {
    const finalValues = {
      ...values,
      sentAmount: baseCurrency || 0,
      receivedAmount: targetCurrency || 0,
      recipientId: recipientId,
      adjustedExchangeRate: adjustedExchangeRate ?? 0,
      exchangeRate: exchangeRate ?? 0,
    };

    console.log("FINAL VALUES===>", finalValues);
    // Put mutate function here
    mutate(
      { json: finalValues },
      {
        onSuccess: () => {
          onCancel?.();
        },
        onError: (error) => {
          console.log("Error creating transfer:", error.message);
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
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-work-sans text-teal-800 font-medium">
                          You send
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-teal-800 font-work-sans font-semibold text-xs">
                              {base}
                            </span>

                            <Input
                              type="number"
                              placeholder="10"
                              {...field}
                              value={field.value || baseCurrency || ""}
                              disabled={isPending}
                              onChange={(e) => {
                                const newValue = Number(e.target.value || 0);
                                field.onChange(newValue); // Sync with form state
                                handleBaseCurrencyChange(newValue);
                              }}
                              className={`border ${
                                fieldState.error ? "border-red-500" : ""
                              } rounded-md w-full h-8 px-8 py-3  pr-10 text-teal-800 font-work-sans font-semibold text-xs`}
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="receivedAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-work-sans text-teal-800 font-medium">
                          They receive
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-teal-800 font-work-sans font-semibold text-xs">
                              {target}
                            </span>
                            <Input
                              type="number"
                              placeholder="10"
                              {...field}
                              value={field.value || targetCurrency || ""}
                              disabled={isPending}
                              onChange={(e) => {
                                const newValue = Number(e.target.value || 0);
                                field.onChange(newValue); // Sync with form state
                                handleTargetCurrencyChange(newValue);
                              }}
                              className="w-full h-8 px-8 py-3 border rounded-md pr-10 text-teal-800 font-work-sans font-semibold text-xs"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="transferReason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-work-sans text-teal-800 font-medium">
                        Transfer Reason
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={isPending}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a transfer reason that matches your reason" />
                          </SelectTrigger>
                          <SelectContent>
                            {TRANSFER_REASONS.map((reason) => (
                              <SelectItem
                                key={reason.reason}
                                value={reason.value}
                              >
                                {reason.reason}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <p className="text-xs font-work-sans text-teal-700 font-semibold text-start">
                    1 {base} = {adjustedExchangeRate} {target}
                  </p>
                </div>
                <DottedSeparator className="py-3" />
                <div className="flex items-center justify-start gap-3">
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={onCancel}
                    disabled={isPending}
                    className={cn(!onCancel && "invisible")}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    disabled={isPending}
                    variant="zap"
                  >
                    Start transfer
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};
