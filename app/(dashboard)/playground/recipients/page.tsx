"use client";
import { DottedSeparator } from "@/components/shared-components/dotted-separator";
import { Button } from "@/components/ui/button";
import { useGetRecipients } from "@/features/recipients/api/use-get-recipients";
import { columns } from "@/features/recipients/components/columns";
import { RecipientDataTable } from "@/features/recipients/components/recipient-data-table";
import { useCreateRecipientModal } from "@/features/recipients/hooks/use-create-recipient-modal";
import { Loader, UsersIcon } from "lucide-react";
import { RiAddCircleFill } from "react-icons/ri";

const RecipientsPage = () => {
  const { open } = useCreateRecipientModal();
  const { data: recipients, isLoading } = useGetRecipients();

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <p className="font-work-sans text-teal-800 text-md font-semibold">
          <span className="flex justify-center items-center gap-3">
            <UsersIcon />
            Recipients
          </span>
        </p>
        <div>
          <Button
            size="sm"
            className="bg-teal-800 text-white font-work-sans hover:bg-white hover:text-teal-800"
            onClick={open}
          >
            <span className="flex">
              <RiAddCircleFill className="size-4 mr-2" />
              New Recipient
            </span>
          </Button>
        </div>
      </div>
      <DottedSeparator />
      {isLoading ? (
        <div className="flex justify-center items-center mt-20">
          <Loader className="w-6 h-6 animate-spin text-teal-800" />
        </div>
      ) : (
        <RecipientDataTable
          data={recipients?.documents ?? []}
          columns={columns}
        />
      )}
    </div>
  );
};

export default RecipientsPage;
