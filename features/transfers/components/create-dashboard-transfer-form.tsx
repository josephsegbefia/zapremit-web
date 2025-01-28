import { DottedSeparator } from "@/components/shared-components/dotted-separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useGetCustomerBeneficiaryCountry } from "@/features/customers/api/use-get-customer-beneficiary-country";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { createTransferSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface CreateDashboardTransferFormProps {
  onCancel?: () => void;
}

export const CreateDashboardTransferForm = ({
  onCancel,
}: CreateDashboardTransferFormProps) => {
  const {
    data: beneficiaryCountry,
    isLoading: isLoadingBeneficiaryCountry,
    isFetching: isFetchingBeneficiaryCountry,
  } = useGetCustomerBeneficiaryCountry();

  const form = useForm<z.infer<typeof createTransferSchema>>({
    resolver: zodResolver(
      createTransferSchema.omit({
        recipientId: true,
        exchangeRate: true,
        adjustedExchangeRate: true,
      })
    ),
    defaultValues: {
      sentAmount: 0,
      receivedAmount: 0,
      transferReason: "DONATIONS",
    },
  });

  const isBusy = isLoadingBeneficiaryCountry || isFetchingBeneficiaryCountry;

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
          <form onSubmit={form.handleSubmit(onSubmit)}></form>
        </Form>
      </CardContent>
    </Card>
  );
};
