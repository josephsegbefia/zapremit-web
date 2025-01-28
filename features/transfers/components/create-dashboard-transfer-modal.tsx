"use client";

import { ResponsiveModal } from "@/components/shared-components/responsive-modal";
import { CreateDashboardTransferForm } from "./create-dashboard-transfer-form";
import { useCreateDashboardTransferModal } from "../hooks/use-create-dashboard-transfer-modal";

export const CreateDashboardTransferModal = () => {
  const { isOpen, setIsOpen, close } = useCreateDashboardTransferModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateDashboardTransferForm onCancel={close} />
    </ResponsiveModal>
  );
};
