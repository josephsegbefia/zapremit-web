"use client";
import { useFetchRecipient } from "@/features/recipients/api/use-fetch-recipient";
import { useCreateTransferModalRecipientPage } from "../hooks/use-create-transfer-modal-recipicient-page";
import { useCreateTransfer } from "../api/use-create-transfer";
import { createTransferSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "@/components/shared-components/dotted-separator";
import { Loader, Send } from "lucide-react";
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
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useGetCustomer } from "@/features/customers/api/use-get-customer";
import { useGetActualRate } from "@/features/exchange/api/use-get-actual-rate";

interface CreateTransferFormRecipientPageProps {
  onCancel?: () => void;
}
export const CreateTransferFormRecipientPage = ({
  onCancel,
}: CreateTransferFormRecipientPageProps) => {
  const [baseCurrency, setBaseCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [debounceBase, setDebounceBase] = useState("");
  const [debounceTarget, setDebounceTarget] = useState("");

  const { recipientId } = useCreateTransferModalRecipientPage();
  const { data, isLoading } = useFetchRecipient(recipientId);
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

  const { data: customer, isLoading: isLoadingCustomer } = useGetCustomer();

  const base = originCountry?.currenyCode || "EUR";
  const target = beneficiaryCountry?.currencyCode || "GHS";

  const { data: exchangeRate, isLoading: isLoadingRate } = useGetExchangeRate({
    base,
    target,
  });

  const { data: actualRate, isLoading: isLoadingActualRate } = useGetActualRate(
    { base, target }
  );

  const isBusy =
    isLoading ||
    isLoadingBeneficiaryCountry ||
    isFetchingBeneficiaryCountry ||
    isLoadingOriginCountry ||
    isFetchingOriginCountry ||
    isLoadingCustomer ||
    isLoadingActualRate ||
    isLoadingRate;

  const form = useForm<z.infer<typeof createTransferSchema>>({
    resolver: zodResolver(createTransferSchema),
    defaultValues: {
      sentAmount: "0.00",
      receivedAmount: "0.00",
    },
  });

  const onSubmit = (values: z.infer<typeof createTransferSchema>) => {
    const finalValues = {
      customerId: customer?.$id || "",
      recipientId: recipientId || "",
      sentAmount: baseCurrency, // Directly from the form field
      receivedAmount: targetCurrency, // Directly from the form field
      originCountry: originCountry?.name || "",
      destinationCountry: beneficiaryCountry?.name || "",
      destinationCurrency: beneficiaryCountry?.currencyCode || "",
      originCurrency: originCountry?.currencyCode || "",
      exchangeRate: actualRate?.toString() || "",
      adjustedExchangeRate: exchangeRate?.toString() || "",
    };

    console.log("Final Payload:", finalValues);

    mutate(
      { json: finalValues },
      {
        onSuccess: () => {
          if (onCancel) {
            onCancel();
          }
        },
        onError: (error) => {
          console.error("Error creating transfer:", error);
        },
      }
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceBase(baseCurrency);
    }, 1000);

    return () => clearTimeout(timer);
  }, [baseCurrency]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceTarget(targetCurrency);
    }, 1000);

    return () => clearTimeout(timer);
  }, [targetCurrency]);

  useEffect(() => {
    if (debounceBase !== "") {
      if (exchangeRate) {
        const convertedTarget = (
          parseFloat(debounceBase || "0") * exchangeRate
        ).toFixed(2);
        setTargetCurrency(convertedTarget);
      }
    }
  }, [debounceBase, exchangeRate]);

  useEffect(() => {
    if (debounceTarget !== "") {
      if (exchangeRate) {
        const convertedBase = (
          parseFloat(debounceTarget || "0") / exchangeRate
        ).toFixed(2);
        setBaseCurrency(convertedBase);
      }
    }
  }, [debounceTarget, exchangeRate]);

  const handleBaseCurrencyChange = (value: string) => {
    setBaseCurrency(value);
    if (!value) {
      setTargetCurrency("0.00");
    }
  };

  const handleTargetCurrencyChange = (value: string) => {
    setTargetCurrency(value);
    if (!value) {
      setBaseCurrency("0.00");
    }
  };

  if (isBusy || !customer) {
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
        <div className="h-full flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row gap-2 justify-between">
            <div className="flex flex-col w-full">
              <label
                htmlFor="origin-country"
                className="text-sm font-work-sans font-semibold text-teal-800"
              >
                Sending from
              </label>
              <div className="relative flex justify-center items-center border border-gray-200 rounded-md bg-gray-100 px-2 py-3 w-full">
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
            <div className="flex flex-col w-full">
              <label
                htmlFor="beneficiary-country"
                className="text-sm font-work-sans font-semibold text-teal-800"
              >
                Sending to
              </label>
              <div className="relative flex justify-center items-center border border-gray-200 rounded-md bg-gray-100 px-2 py-3 w-full">
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
                <div className="flex flex-col lg:flex-row gap-2 justify-between items-center">
                  <FormField
                    control={form.control}
                    name="sentAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-work-sans text-teal-800">
                          You send
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-teal-800 font-work-sans font-semibold">
                              {base}
                            </span>
                            <Input
                              type="number"
                              placeholder="e.g 20.00"
                              {...field}
                              disabled={isPending}
                              value={baseCurrency}
                              onChange={(e) =>
                                handleBaseCurrencyChange(e.target.value)
                              }
                              className="w-full h-10 px-8 py-3 border rounded-md pr-16  text-teal-600 font-work-sans font-semibold" // Add padding for the text
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
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
                          <div className="relative">
                            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-teal-800 font-work-sans font-semibold">
                              {target}
                            </span>
                            <Input
                              type="number"
                              placeholder="e.g 20.00"
                              {...field}
                              disabled={isPending}
                              value={targetCurrency}
                              onChange={(e) =>
                                handleTargetCurrencyChange(e.target.value)
                              }
                              className="w-full h-10 px-8 py-3 border rounded-md pr-16 text-teal-600 font-work-sans font-semibold"
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-2">
                  <p className="text-teal-800 font-semibold text-xs text-start">
                    1 {base} = {exchangeRate} {target}
                  </p>
                </div>

                <DottedSeparator className="py-7" />
                <div className="flex items-center justify-start gap-3">
                  <Button
                    type="button"
                    size="lg"
                    variant="destructive"
                    onClick={onCancel}
                    disabled={isPending}
                    className={cn(!onCancel && "invisible")}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isPending}
                    variant="zap"
                    // onClick={onSubmit}
                  >
                    <span className="flex justify-center items-center">
                      <Send className="size-4 mr-2" />
                      Complete Transfer
                    </span>
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
