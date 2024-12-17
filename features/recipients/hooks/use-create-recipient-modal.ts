import { useQueryState, parseAsBoolean } from "nuqs";

export const useCreateRecipientModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "create-recipient",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    open,
    close,
    setIsOpen,
  };
};
