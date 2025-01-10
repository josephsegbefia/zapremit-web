import { useQueryStates, parseAsBoolean, parseAsString } from "nuqs";

export const useCreateTransferModalRecipientPage = () => {
  const [{ newtransfer: isOpen, recipientId }, setQueryStates] = useQueryStates(
    {
      newtransfer: parseAsBoolean
        .withDefault(false)
        .withOptions({ clearOnDefault: true }),
      recipientId: parseAsString
        .withDefault("")
        .withOptions({ clearOnDefault: true }),
    }
  );

  const open = (id?: string) => {
    setQueryStates({ newtransfer: true, recipientId: id || "" });
  };

  const close = () => {
    setQueryStates({ newtransfer: false, recipientId: "" });
  };

  return {
    isOpen,
    recipientId,
    open,
    close,
    setQueryStates,
  };
};
