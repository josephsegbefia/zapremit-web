"use client";

import { useUpdateRecipientModal } from "../hooks/use-update-recipient-modal";

interface UpdateRecipientFormProps {
  onCancel?: () => void;
}

export const UpdateRecipientForm = ({ onCancel }: UpdateRecipientFormProps) => {
  const { recipientId } = useUpdateRecipientModal();

  return (
    <div>
      <p>Recipient ID: {recipientId}</p>
    </div>
  );
};
