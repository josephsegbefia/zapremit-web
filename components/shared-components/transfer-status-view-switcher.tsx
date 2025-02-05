"use client";
// import { DottedSeparator } from "./dotted-separator";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCreateTransferModalRecipientPage } from "@/features/transfers/hooks/use-create-transfer-modal-recipient-page";
import { useQueryState } from "nuqs";
import { RiAddCircleFill } from "react-icons/ri";

interface TransferStatusViewSwitcherProps {
  isRecipientDetailsPage: boolean;
  recipientId?: string;
}

export const TransferStatusViewSwitcher = ({
  isRecipientDetailsPage,
  recipientId,
}: TransferStatusViewSwitcherProps) => {
  const [view, setView] = useQueryState("transfer-status", {
    defaultValue: "completed",
  });

  const { open } = useCreateTransferModalRecipientPage();
  return (
    <Tabs
      className="flex-1 w-full border rounded-lg"
      defaultValue={view}
      onValueChange={setView}
    >
      <div className="h-full flex flex-col overflow-auto p-2">
        <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
          <TabsList className="w-full lg:w-auto border-none">
            {!isRecipientDetailsPage && (
              <TabsTrigger
                className="h-8 w-full lg:w-auto font-work-sans"
                value="all"
              >
                All
              </TabsTrigger>
            )}
            <TabsTrigger
              className="h-8 w-full lg:w-auto font-work-sans"
              value="completed"
            >
              Completed
            </TabsTrigger>
            <TabsTrigger
              className="h-8 w-full lg:w-auto font-work-sans"
              value="pending"
            >
              Pending
            </TabsTrigger>
            <TabsTrigger
              className="h-8 w-full lg:w-auto font-work-sans"
              value="canceled"
            >
              Canceled
            </TabsTrigger>
            <TabsTrigger
              className="h-8 w-full lg:w-auto font-work-sans"
              value="failed"
            >
              Failed
            </TabsTrigger>
          </TabsList>
          {isRecipientDetailsPage && (
            <Button
              size="sm"
              className="w-full lg:w-auto bg-teal-600 font-work-sans text-white hover:bg-white hover:text-teal-600 border hover:border-teal-600 cursor-pointer"
              onClick={() => open(recipientId)}
            >
              <RiAddCircleFill className="size-4 mr-2" />
              New Transfer
            </Button>
          )}
        </div>
      </div>
    </Tabs>
  );
};
