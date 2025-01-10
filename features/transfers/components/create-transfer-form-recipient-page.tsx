import { useCreateTransferModalRecipientPage } from "../hooks/use-create-transfer-modal-recipicient-page";

interface CreateTransferFormRecipientPageProps {
  onCancel?: () => void;
}
export const CreateTransferFormRecipientPage = ({
  onCancel,
}: CreateTransferFormRecipientPageProps) => {
  const { recipientId } = useCreateTransferModalRecipientPage();
  return (
    <div>
      <h1>{recipientId}</h1>
    </div>
  );
};
