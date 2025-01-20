import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "lucide-react";
import { useCreateTransferModalRecipientPage } from "../hooks/use-create-transfer-modal-recipient-page";
import { useFetchRecipient } from "@/features/recipients/api/use-fetch-recipient";

interface CreateTransferFormRecipientPageprops {
  onCancel?: () => void;
}

export const CreateTransferFormRecipientPage = ({
  onCancel,
}: CreateTransferFormRecipientPageprops) => {
  const { recipientId } = useCreateTransferModalRecipientPage();
  const { data: recipient, isLoading: isFetchingRecipient } =
    useFetchRecipient(recipientId);

  const isBusy = isFetchingRecipient;

  if (isBusy) {
    return (
      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex justify-center items-center mb-3">
            <Loader className="w-6 h-6 animate-spin text-teal-800" />
          </div>
          <p className="text-teal-800 text-sm text-center font-work-sans">
            Loading data, please wait...
          </p>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold font-work-sans text-teal-800">
          Transfer Form
        </CardTitle>
      </CardHeader>
    </Card>
  );
};
