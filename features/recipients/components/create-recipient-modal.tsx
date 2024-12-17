"use client";
import { ResponsiveModal } from "@/components/shared-components/responsive-modal";

import { CreateRecipientForm } from "./create-recipient-form";
import { useCreateRecipientModal } from "../hooks/use-create-recipient-modal";

export const CreateRecipientModal = () => {
  const { isOpen, setIsOpen, close } = useCreateRecipientModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateRecipientForm onCancel={close} />
    </ResponsiveModal>
  );
};
