"use client";

import { ResponsiveModal } from "@/components/shared-components/responsive-modal";
import { useUpdateRecipientModal } from "../hooks/use-update-recipient-modal";
import { UpdateRecipientForm } from "./update-recipient-form";

export const UpdateRecipientModal = () => {
  const { isOpen, close, setQueryStates } = useUpdateRecipientModal();

  const handleOpenChange = (open: boolean) => {
    setQueryStates({ isOpen: open });
    if (!open) {
      close();
    }
  };

  return (
    <ResponsiveModal open={isOpen} onOpenChange={handleOpenChange}>
      <UpdateRecipientForm onCancel={close} />
    </ResponsiveModal>
  );
};
