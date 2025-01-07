"use client";
import { DottedSeparator } from "@/components/shared-components/dotted-separator";
import { TransferStatusViewSwitcher } from "@/components/shared-components/transfer-status-view-switcher";
import { Button } from "@/components/ui/button";
import React from "react";
import { RiAddCircleFill, RiExchange2Line } from "react-icons/ri";

const page = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <p className="font-work-sans text-teal-800 text-md font-semibold">
          <span className="flex justify-center items-center gap-3">
            <RiExchange2Line />
            Transfers
          </span>
        </p>
        <div>
          <Button
            size="sm"
            className="bg-teal-600 text-white font-work-sans hover:bg-white hover:text-teal-800"
            onClick={() => {}}
          >
            <span className="flex">
              <RiAddCircleFill className="size-4 mr-2" />
              New Transfer
            </span>
          </Button>
        </div>
      </div>
      <DottedSeparator />
      <TransferStatusViewSwitcher isRecipientDetailsPage={false} />
      {/* {isLoading ? (
        <div className="flex justify-center items-center mt-20">
          <Loader className="w-6 h-6 animate-spin text-teal-800" />
        </div>
      ) : (
        <RecipientDataTable
          data={recipients?.documents ?? []}
          columns={columns}
        />
      )} */}
    </div>
  );
};

export default page;
