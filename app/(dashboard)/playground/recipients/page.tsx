"use client";
import { Button } from "@/components/ui/button";
import { useCreateRecipientModal } from "@/features/recipients/hooks/use-create-recipient-modal";
import { RiAddCircleFill } from "react-icons/ri";

const RecipientsPage = () => {
  const { open } = useCreateRecipientModal();
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        Something here, dont know yet
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
    </div>
  );
};

export default RecipientsPage;
