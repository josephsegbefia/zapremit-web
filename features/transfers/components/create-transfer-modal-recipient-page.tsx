"use client";
import { ResponsiveModal } from "@/components/shared-components/responsive-modal";
import { useCreateTransferModalRecipientPage } from "../hooks/use-create-transfer-modal-recipient-page";
import { CreateTransferFormRecipientPage } from "./create-transfer-form-recipient-page";

export const CreateTransferModalRecipientPage = () => {
  const { isOpen, close, setQueryStates } =
    useCreateTransferModalRecipientPage();

  const handleOpenChange = (open: boolean) => {
    setQueryStates({ newTransfer: open });

    if (!open) {
      close();
    }
  };

  return (
    <ResponsiveModal open={isOpen} onOpenChange={handleOpenChange}>
      <CreateTransferFormRecipientPage onCancel={close} />
    </ResponsiveModal>
  );
};
