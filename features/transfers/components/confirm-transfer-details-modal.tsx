"use client";

import { useConfirmTransferDetails } from "../hooks/use-confirm-transfer-details";
import { ConfirmTransferDetails } from "./confirm-transfer-details";
import { ResponsiveTransferDetailsModal } from "./responsive-transfer-details-modal";

export const ConfirmTransferDetailsModal = () => {
  const { isOpen, close, setIsOpen } = useConfirmTransferDetails();

  return (
    <ResponsiveTransferDetailsModal open={isOpen} onOpenChange={setIsOpen}>
      <ConfirmTransferDetails onCancel={close} />
    </ResponsiveTransferDetailsModal>
  );
};
