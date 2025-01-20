import { useQueryStates, parseAsBoolean, parseAsString } from "nuqs";

export const useCreateTransferModalRecipientPage = () => {
  const [{ newTransfer: isOpen, recipientId }, setQueryStates] = useQueryStates(
    {
      newTransfer: parseAsBoolean
        .withDefault(false)
        .withOptions({ clearOnDefault: true }),
      recipientId: parseAsString
        .withDefault("")
        .withOptions({ clearOnDefault: true }),
    }
  );

  const open = (id?: string) => {
    setQueryStates({ newTransfer: true, recipientId: id || "" });
  };

  const close = () => {
    setQueryStates({ newTransfer: false, recipientId: "" });
  };

  return {
    isOpen,
    recipientId,
    open,
    close,
    setQueryStates,
  };
};
