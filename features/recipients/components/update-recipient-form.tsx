"use client";

import { useFetchRecipient } from "../api/use-fetch-recipient";
import { useUpdateRecipientModal } from "../hooks/use-update-recipient-modal";

interface UpdateRecipientFormProps {
  onCancel?: () => void;
}

export const UpdateRecipientForm = ({ onCancel }: UpdateRecipientFormProps) => {
  const { recipientId } = useUpdateRecipientModal();
  const { data, isLoading, error } = useFetchRecipient(recipientId);

  console.log(data);

  return (
    <div>
      <p>Recipient ID: {recipientId}</p>
      {JSON.stringify(data)}
    </div>
  );
};
