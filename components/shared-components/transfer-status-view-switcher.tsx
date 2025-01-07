"use client";
import { DottedSeparator } from "./dotted-separator";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQueryState } from "nuqs";
import { RiAddCircleFill } from "react-icons/ri";

interface TransferStatusViewSwitcherProps {
  isRecipientDetailsPage: boolean;
}

export const TransferStatusViewSwitcher = ({
  isRecipientDetailsPage,
}: TransferStatusViewSwitcherProps) => {
  const [view, setView] = useQueryState("transfer-status", {
    defaultValue: "completed",
  });
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
          </TabsList>
          {isRecipientDetailsPage && (
            <Button
              size="sm"
              className="w-full lg:w-auto bg-teal-600 font-work-sans text-white hover:bg-white hover:text-teal-600 border hover:border-teal-600 cursor-pointer"
              onClick={() => {}}
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
