import { useQueryState, parseAsBoolean } from "nuqs";

export const useCreateDashboardTransferModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "send-money-from-dashboard",
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
