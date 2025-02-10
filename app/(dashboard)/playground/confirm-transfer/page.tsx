"use client";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RiAddCircleFill } from "react-icons/ri";
import { ArrowLeft } from "lucide-react";
import { DottedSeparator } from "@/components/shared-components/dotted-separator";
import { useFetchRecipient } from "@/features/recipients/api/use-fetch-recipient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetCustomerBeneficiaryCountry } from "@/features/customers/api/use-get-customer-beneficiary-country";
import { useGetCustomerOriginCountry } from "@/features/customers/api/use-get-customer-origin-country";
import { useGetTransferFee } from "@/features/fees-and-promotions/api/use-get-transfer-fee";
import { useCreateTransfer } from "@/features/transfers/api/use-create-transfer";
import { useGetTransferConfirmation } from "@/features/transfer-details-storage/api/use-get-transfer-confirmation";

type TransferReason =
  | "FAMILY_AND_FRIENDS_SUPPORT"
  | "PAYMENT_FOR_GOODS_AND_SERVICES"
  | "DONATIONS"
  | "SAVINGS";

type TransferData = {
  recipientId: string;
  sentAmount: number;
  receivedAmount: number;
  adjustedExchangeRate: number;
  transferReason: TransferReason;
};
const ConfirmTransfer = () => {
  const { mutate, isPending } = useCreateTransfer();
  const searchParams = useSearchParams();
  const confirmationId = searchParams.get("id") || "";

  const {
    data: confirmationData,
    isLoading: isLoadingConfirmationData,
    error: confirmationDataError,
  } = useGetTransferConfirmation(confirmationId);

  let recipientId;
  if (confirmationData) {
    recipientId = confirmationData.recipientId;
  }
  const { data: recipient, isLoading } = useFetchRecipient(recipientId || "");
  const { data: originCountry, isLoading: isLoadingOriginCountry } =
    useGetCustomerOriginCountry();

  const { data: beneficiaryCountry, isLoading: isLoadingBeneficiaryCountry } =
    useGetCustomerBeneficiaryCountry();

  const { data: transferFee, isLoading: isLoadingTranferFee } =
    useGetTransferFee();

  let totalPaid;
  if (confirmationData?.sentAmount) {
    totalPaid =
      parseFloat(transferFee) + parseFloat(confirmationData?.sentAmount);
  }

  let values: TransferData | undefined;

  if (confirmationData) {
    values = {
      recipientId: recipientId || "",
      sentAmount: parseFloat(confirmationData.sentAmount),
      receivedAmount: parseFloat(confirmationData.receivedAmount),
      adjustedExchangeRate: parseFloat(confirmationData.adjustedExchangeRate),
      transferReason: confirmationData.transferReason as TransferReason,
    };
  }

  const sendMoney = () => {
    if (!values) {
      console.error("Missing required values");
      return;
    }

    mutate(
      { json: values },
      {
        onSuccess: () => {
          // if (onCancel) {
          //   onCancel();
          // }
        },
        onError: (error) => {
          console.error("Error initiating transfer:", error);
        },
      }
    );
  };

  const isLoadingInfo =
    isLoading ||
    isLoadingConfirmationData ||
    isLoadingBeneficiaryCountry ||
    isLoadingOriginCountry ||
    isLoadingTranferFee;

  if (isLoadingInfo) {
    return (
      <div className="flex items-center justify-center">
        <Loader className="w-6 h-6 animate-spin text-teal-800" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <p className="font-work-sans text-teal-800 text-md font-semibold">
          <span className="flex justify-center items-center gap-3">
            <CheckCircle className="size-4 mr-2" />
            Confirm Transfer Details
          </span>
        </p>
        <div>
          <Button
            size="sm"
            className="bg-teal-600 text-white font-work-sans hover:bg-white hover:text-red-800 hover:border border-red-500"
            onClick={() => {}}
          >
            <span className="flex">
              <ArrowLeft className="size-4 mr-2" />
              Back
            </span>
          </Button>
        </div>
      </div>
      <p className="text-xs font-work-sans text-teal-800">
        Please check and confirm the details of the transfer to{" "}
        {recipient?.name} in {recipient?.country}
      </p>
      <DottedSeparator />
      <div className="flex items-center justify-center">
        <Card className="w-full h-full border-none shadow-none">
          <CardHeader className="flex py-5 px-7">
            <CardTitle className="">
              <p className="text-xl font-bold font-work-sans text-teal-800">
                Transfer details
              </p>
              <p className="text-xs font-work-sans font-normal text-teal-800">
                Please make sure the following details are correct to prevent a
                delay in your transfer
                {/* <Image
                src={beneficiaryCountry?.flagImageUrl || ""}
                alt="country flag"
                width={20}
                height={10}
                className="rounded-sm"
              />
              <span className="font-semibold">{beneficiaryCountry?.name}</span> */}
              </p>
            </CardTitle>
          </CardHeader>
          <div className="px-7">
            <DottedSeparator />
          </div>
          <CardContent className="p-4">
            <div className="px-10">
              <div className="flex justify-between gap-x-2 py-2">
                <p className="text-sm font-semibold font-work-sans text-teal-800">
                  Recipient
                </p>
                <p className="text-sm font-medium font-work-sans text-teal-800">
                  {recipient?.name}
                </p>
              </div>

              <div className="flex justify-between gap-x-2 py-2">
                <p className="text-sm font-semibold font-work-sans text-teal-800">
                  Phone number
                </p>
                <p className="text-sm font-medium font-work-sans text-teal-800">
                  {recipient?.callingCode}
                  {recipient?.phone}
                </p>
              </div>
              <div className="flex justify-between gap-x-2 py-2">
                <p className="text-sm font-semibold font-work-sans text-teal-800">
                  Mobile Wallet
                </p>
                <p className="text-sm font-medium font-work-sans text-teal-800">
                  {recipient?.mobile_wallet}
                </p>
              </div>

              <div className="flex justify-between gap-x-2 py-2">
                <p className="text-sm font-semibold font-work-sans text-teal-800">
                  You send
                </p>
                <p className="text-sm font-medium font-work-sans text-teal-800">
                  {confirmationData?.sentAmount}
                  <span className="text-sm font-semibold font-work-sans text-teal-800">
                    {originCountry?.currencyCode}
                  </span>
                </p>
              </div>

              <div className="flex justify-between gap-x-2 py-2">
                <p className="text-sm font-semibold font-work-sans text-teal-800">
                  They receive
                </p>
                <p className="text-sm font-medium font-work-sans text-teal-800">
                  {confirmationData?.receivedAmount}
                  <span className="text-sm font-semibold font-work-sans text-teal-800">
                    {beneficiaryCountry?.currencyCode}
                  </span>
                </p>
              </div>

              <div className="flex justify-between gap-x-2 py-2">
                <p className="text-sm font-semibold font-work-sans text-teal-800">
                  Purpose
                </p>
                <p className="text-sm font-medium font-work-sans text-teal-800">
                  {confirmationData?.transferReason}
                </p>
              </div>
            </div>
            <div className="px-7 pt-2">
              <DottedSeparator />
            </div>
            <div className="px-10">
              <div className="flex justify-between gap-x-2 py-2">
                <p className="text-sm font-semibold font-work-sans text-teal-800">
                  Rate
                </p>
                <p className="text-sm font-medium font-work-sans text-teal-800">
                  1 {originCountry?.currencyCode} ={" "}
                  {confirmationData?.adjustedExchangeRate}{" "}
                  {beneficiaryCountry?.currencyCode}
                </p>
              </div>

              <div className="flex justify-between gap-x-2 py-2">
                <p className="text-sm font-semibold font-work-sans text-teal-800">
                  Transfer Fee
                </p>
                <p className="text-sm font-medium font-work-sans text-teal-800">
                  {transferFee} {originCountry?.currencyCode}
                </p>
              </div>
            </div>
            <div className="px-7 py-2">
              <DottedSeparator />
            </div>
            <div className="px-10">
              <div className="flex justify-between gap-x-2 py-2">
                <p className="text-sm font-semibold font-work-sans text-teal-800">
                  Total due
                </p>
                <p className="text-sm font-medium font-work-sans text-teal-800">
                  {totalPaid} {originCountry?.currencyCode}
                </p>
              </div>
            </div>
            <div className="px-10">
              <div className="flex justify-right gap-x-2 py-2">
                <Button variant="zap" onClick={sendMoney} disabled={isPending}>
                  {isPending ? "Sending money..." : "Confirm & Send"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConfirmTransfer;
