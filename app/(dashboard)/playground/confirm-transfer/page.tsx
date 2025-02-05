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

const ConfirmTransfer = () => {
  const searchParams = useSearchParams();
  const recipientId = searchParams.get("recipientId") || "";
  const sentAmount = searchParams.get("sent");
  const receivedAmount = searchParams.get("receivable");
  const adjustedExchangeRate = searchParams.get("rate");
  const transferReason = searchParams.get("reason");

  const { data: recipient, isLoading } = useFetchRecipient(recipientId);
  const { data: originCountry, isLoading: isLoadingOriginCountry } =
    useGetCustomerOriginCountry();

  const { data: beneficiaryCountry, isLoading: isLoadingBeneficiaryCountry } =
    useGetCustomerBeneficiaryCountry();

  const isLoadingInfo =
    isLoading || isLoadingBeneficiaryCountry || isLoadingBeneficiaryCountry;

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
                  {sentAmount}{" "}
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
                  {receivedAmount}{" "}
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
                  {transferReason}
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
                  1 {originCountry?.currencyCode} = {adjustedExchangeRate}{" "}
                  {beneficiaryCountry?.currencyCode}
                </p>
              </div>

              <div className="flex justify-between gap-x-2 py-2">
                <p className="text-sm font-semibold font-work-sans text-teal-800">
                  Transfer Fee
                </p>
                <p className="text-sm font-medium font-work-sans text-teal-800"></p>
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
                <p className="text-sm font-medium font-work-sans text-teal-800"></p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConfirmTransfer;
