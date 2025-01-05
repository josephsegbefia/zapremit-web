"use client";
import { DottedSeparator } from "@/components/shared-components/dotted-separator";
import { TransferStatusViewSwitcher } from "@/components/shared-components/transfer-status-view-switcher";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFetchRecipient } from "@/features/recipients/api/use-fetch-recipient";
import { ArrowLeftIcon, Loader } from "lucide-react";
import { useRouter } from "next/navigation";

interface ViewRecipientIdPageProps {
  params: {
    recipientId: string;
  };
}

const ViewRecipientIdPage = ({ params }: ViewRecipientIdPageProps) => {
  const router = useRouter();
  const recipientId = params.recipientId;
  const { data, isLoading } = useFetchRecipient(recipientId);

  if (isLoading) {
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
      <CardHeader className="flex flex-row items-center gap-x-[100px] p-7 space-y-0">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            router.push(`/playground/recipients`);
          }}
          className="font-work-sans text-white hover:bg-white hover:text-teal-600 border hover:border-teal-600 cursor-pointer bg-teal-600"
        >
          <ArrowLeftIcon className="size-4 mr-2" />
          Back
        </Button>
        <CardTitle className="text-xl text-teal-800 font-bold font-work-sans">
          {data?.name}
        </CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <p className="text-teal-800 font-work-sans font-semibold px-3 pb-4">
          Transfers
        </p>
        <TransferStatusViewSwitcher />
      </CardContent>
    </Card>
  );
};

export default ViewRecipientIdPage;
