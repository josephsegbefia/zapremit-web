"use client";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RiAddCircleFill } from "react-icons/ri";
import { ArrowLeft } from "lucide-react";
import { DottedSeparator } from "@/components/shared-components/dotted-separator";
import { useFetchRecipient } from "@/features/recipients/api/use-fetch-recipient";

const ConfirmTransfer = () => {
  const searchParams = useSearchParams();
  const recipientId = searchParams.get("recipientId") || "";
  const sentAmount = searchParams.get("sent");
  const receivedAmount = searchParams.get("receivable");
  const adjustedExchangeRate = searchParams.get("rate");
  const transferReason = searchParams.get("reason");

  const { data: recipient, isLoading } = useFetchRecipient(recipientId);

  console.log(recipient);
  if (isLoading) {
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
    </div>
  );
};

export default ConfirmTransfer;
