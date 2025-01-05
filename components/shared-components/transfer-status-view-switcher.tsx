"use client";
import { DottedSeparator } from "./dotted-separator";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader, PlusIcon } from "lucide-react";
import { useQueryState } from "nuqs";

export const TransferStatusViewSwitcher = () => {
  const [view, setView] = useQueryState("transfer-status", {
    defaultValue: "completed",
  });
  return (
    <Tabs
      className="flex-1 w-full border rounded-lg"
      defaultValue={view}
      onValueChange={setView}
    >
      <div className="h-full flex flex-col overflow-auto p-4">
        <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
          <TabsList className="w-full lg:w-auto border-none">
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
          <Button
            size="sm"
            className="w-full lg:w-auto bg-teal-600 font-work-sans text-white hover:bg-white hover:text-teal-600 border hover:border-teal-600 cursor-pointer"
            onClick={() => {}}
          >
            <PlusIcon className="size-4 mr-2" />
            New Transfer
          </Button>
        </div>
      </div>
    </Tabs>
  );
};
