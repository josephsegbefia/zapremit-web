import { useQueryStates, parseAsBoolean, parseAsString } from "nuqs";

export const useUpdateRecipientModal = () => {
  const [{ isOpen, recipientId }, setQueryStates] = useQueryStates({
    isOpen: parseAsBoolean
      .withDefault(false)
      .withOptions({ clearOnDefault: true }),
    recipientId: parseAsString
      .withDefault("")
      .withOptions({ clearOnDefault: true }),
  });

  const open = (id?: string) => {
    setQueryStates({ isOpen: true, recipientId: id || "" });
  };

  const close = () => {
    setQueryStates({ isOpen: false, recipientId: "" }); // Explicitly clear recipientId
  };

  return {
    isOpen,
    recipientId,
    open,
    close,
    setQueryStates,
  };
};
