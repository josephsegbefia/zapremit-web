import { DottedSeparator } from "@/components/shared-components/dotted-separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useGetCustomerBeneficiaryCountry } from "@/features/customers/api/use-get-customer-beneficiary-country";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { createTransferSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useGetCustomerOriginCountry } from "@/features/customers/api/use-get-customer-origin-country";
import { useGetAdjustedExchangeRate } from "@/features/exchange/api/use-get-adjusted-exchange-rate";
import { useGetRecipients } from "@/features/recipients/api/use-get-recipients";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCreateTransferConfirmation } from "@/features/transfer-details-storage/api/use-create-transfer-confirmation";
import { useRouter } from "next/navigation";

const TRANSFER_REASONS = [
  { reason: "Family & Friends Support", value: "FAMILY_AND_FRIENDS_SUPPORT" },
  {
    reason: "Payment for goods or services",
    value: "PAYMENT_FOR_GOODS_AND_SERVICES",
  },
  { reason: "Donations", value: "DONATIONS" },
  { reason: "Savings", value: "SAVINGS" },
];

interface CreateDashboardTransferFormProps {
  onCancel?: () => void;
}

export const CreateDashboardTransferForm = ({
  onCancel,
}: CreateDashboardTransferFormProps) => {
  const router = useRouter();
  const [baseCurrency, setBaseCurrency] = useState<number | null>(null);
  const [targetCurrency, setTargetCurrency] = useState<number | null>(null);
  const [debounceBase, setDebounceBase] = useState<number | null>(null);
  const [debounceTarget, setDebounceTarget] = useState<number | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecipientId, setSelectedRecipientId] = useState<string | null>(
    null
  );

  const { data: recipients, isLoading: isLoadingRecipients } =
    useGetRecipients();
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

  const base = originCountry?.currencyCode || "";
  const target = beneficiaryCountry?.currencyCode || "";

  const {
    data: adjustedExchangeRate,
    isLoading: isLoadingAdjustedExchangeRate,
  } = useGetAdjustedExchangeRate({ base, target });

  const { mutate, isPending } = useCreateTransferConfirmation();

  const form = useForm<z.infer<typeof createTransferSchema>>({
    resolver: zodResolver(
      createTransferSchema.omit({
        recipientId: true,
        adjustedExchangeRate: true,
      })
    ),
    defaultValues: {
      sentAmount: 0,
      receivedAmount: 0,
      transferReason: "DONATIONS",
    },
  });

  const filteredRecipients = recipients?.documents.filter((recipient) =>
    recipient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectChange = (value: string) => {
    setSelectedRecipientId(value);
    console.log("Selected Recipient $id", value);
  };

  const isBusy =
    isLoadingBeneficiaryCountry ||
    isFetchingBeneficiaryCountry ||
    isLoadingRecipients ||
    isLoadingOriginCountry ||
    isLoadingAdjustedExchangeRate ||
    isFetchingOriginCountry;

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
      form.setValue("receivedAmount", parseFloat(convertedTarget));
    }
  }, [debounceBase, adjustedExchangeRate]);

  useEffect(() => {
    if (debounceTarget !== null && adjustedExchangeRate) {
      const convertedBase = (debounceTarget / adjustedExchangeRate).toFixed(2);
      setBaseCurrency(parseFloat(convertedBase));
      form.setValue("sentAmount", parseFloat(convertedBase));
    }
  }, [debounceTarget, adjustedExchangeRate]);

  const handleBaseCurrencyChange = (value: number) => {
    setBaseCurrency(value);
    form.setValue("sentAmount", value);
  };

  const handleTargetCurrencyChange = (value: number) => {
    setTargetCurrency(value);
    form.setValue("receivedAmount", value);
  };

  const onSubmit = async (values: z.infer<typeof createTransferSchema>) => {
    if (!selectedRecipientId) {
      console.error("Recipient ID is required");
      return;
    }

    const finalValues = {
      ...values,
      recipientId: selectedRecipientId,
      adjustedExchangeRate: adjustedExchangeRate || 0,
    };

    console.log("FINAL VALUES", finalValues);
    mutate(
      { json: finalValues },
      {
        onSuccess: ({ data }) => {
          router.push(`/playground/confirm-transfer?id=${data.$id}`);
        },
        onError: (error) => {
          console.error("Error saving confirmation details:", error);
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
    <>
      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="flex py-5 px-7">
          <CardTitle className="text-xl font-bold font-work-sans text-teal-800">
            Initiate a transfer
            <p className="text-teal-800 text-xs font-medium flex items-center gap-2">
              Fill the form below to start a transfer to:
              <Image
                src={beneficiaryCountry?.flagImageUrl || ""}
                alt="country flag"
                width={20}
                height={10}
                className="rounded-sm"
              />
              <span className="font-semibold">{beneficiaryCountry?.name}</span>
            </p>
          </CardTitle>
        </CardHeader>
        <div className="px-7">
          <DottedSeparator />
        </div>
        <CardContent className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {!selectedRecipientId && (
                <p className="text-xs font-medium text-red-500 font-work-sans my-2">
                  Please do well to select a recipient
                </p>
              )}

              <Select onValueChange={handleSelectChange} disabled={isPending}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Search or select a recipient" />
                </SelectTrigger>
                <SelectContent>
                  <div className="p-2">
                    <Input
                      disabled={isPending}
                      placeholder="Search recipients by name"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-8 px-8 py-3 border rounded-md pr-10 text-teal-800 font-work-sans font-semibold text-xs"
                    />
                  </div>
                  {filteredRecipients?.map((recipient) => (
                    <SelectItem
                      key={recipient.$id}
                      value={recipient.$id}
                      className="w-full h-8 px-8 py-3 pr-10 text-teal-800 font-work-sans font-semibold text-xs"
                    >
                      <p className="w-full h-8 px-8 py-2 pr-10 text-teal-800 font-work-sans font-semibold text-xs">
                        {recipient.name}
                      </p>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-col gap-y-4 mt-4">
                <div className="flex flex-col lg:flex-row gap-2 justify-between items-center">
                  <FormField
                    control={form.control}
                    name="sentAmount"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel
                          className={`text-xs font-work-sans ${
                            fieldState.error ? "text-red-500" : "text-teal-800"
                          } font-medium`}
                        >
                          You send
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-teal-800 font-work-sans font-semibold text-xs">
                              {base}
                            </span>

                            <Input
                              disabled={isPending}
                              type="number"
                              placeholder="10"
                              {...field}
                              value={field.value || baseCurrency || ""}
                              onChange={(e) => {
                                const newValue = Number(e.target.value || 0);
                                field.onChange(newValue);
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
                    disabled={isPending}
                    control={form.control}
                    name="receivedAmount"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel
                          className={`text-xs font-work-sans ${
                            fieldState.error ? "text-red-500" : "text-teal-800"
                          } font-medium`}
                        >
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
                              onChange={(e) => {
                                const newValue = Number(e.target.value || 0);
                                field.onChange(newValue);
                                handleTargetCurrencyChange(newValue);
                              }}
                              className={`border ${
                                fieldState.error ? "border-red-500" : ""
                              } rounded-md w-full h-8 px-8 py-3  pr-10 text-teal-800 font-work-sans font-semibold text-xs`}
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
                    className={cn(!onCancel && "invisible")}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    disabled={!selectedRecipientId || isPending}
                    variant="zap"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};
