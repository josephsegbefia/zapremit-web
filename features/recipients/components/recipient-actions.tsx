import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ExternalLinkIcon, PencilIcon, Send, TrashIcon } from "lucide-react";
import { useDeleteRecipient } from "../api/use-delete-recipient";
import { useConfirm } from "@/hooks/use-confirm";
import { useRouter } from "next/navigation";
import { useUpdateRecipientModal } from "../hooks/use-update-recipient-modal";

interface RecipientActionsProps {
  id: string;
  recipientId: string;
  children: React.ReactNode;
}

export const RecipientActions = ({
  id,
  recipientId,
  children,
}: RecipientActionsProps) => {
  const { open } = useUpdateRecipientModal();
  const router = useRouter();
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Recipeint",
    "This action cannot be undone",
    "destructive"
  );

  const { mutate, isPending } = useDeleteRecipient();

  const onDelete = async () => {
    const ok = await confirm();
    if (!ok) return;

    mutate({ param: { recipientId: id } });
  };

  const onViewRecipientPage = () => {
    router.push(`/playground/recipients/${recipientId}`);
  };

  return (
    <div className="flex justify-end">
      <ConfirmDialog />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {/* Make this open a modal to send money to the current recipient */}
          <DropdownMenuItem
            onClick={onViewRecipientPage}
            disabled={isPending}
            className="font-medium p-[10px] text-teal-800 hover:bg-white hover:text-teal-800 font-work-sans"
          >
            <Send className="size-4 mr-2 stroke-2 text-teal-800" />
            Send Money
          </DropdownMenuItem>
          {/* End */}
          <DropdownMenuItem
            onClick={onViewRecipientPage}
            disabled={isPending}
            className="font-medium p-[10px] text-teal-800"
          >
            <ExternalLinkIcon className="size-4 mr-2 stroke-2  text-teal-800" />
            View Recipient
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => open(recipientId)}
            disabled={isPending}
            className="font-medium p-[10px] text-teal-800"
          >
            <PencilIcon className="size-4 mr-2 stroke-2  text-teal-800" />
            Edit Recipient
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onDelete}
            disabled={isPending}
            className="font-medium p-[10px] text-red-800"
          >
            <TrashIcon className="size-4 mr-2 stroke-2  text-red-800" />
            Delete Recipient
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
