import { useQueryStates, parseAsBoolean, parseAsString } from "nuqs";

export const useConfirmTransferDetails = () => {
  const [
    {
      confirm: isOpen,
      recipientId,
      sentAmount,
      receivedAmount,
      adjustedExchangeRate,
      exchangeRate,
      transferReason,
    },
    setQueryStates,
  ] = useQueryStates({
    confirm: parseAsBoolean
      .withDefault(false)
      .withOptions({ clearOnDefault: false }),
    sentAmount: parseAsString
      .withDefault("")
      .withOptions({ clearOnDefault: true }),
    receivedAmount: parseAsString
      .withDefault("")
      .withOptions({ clearOnDefault: true }),
    recipientId: parseAsString
      .withDefault("")
      .withOptions({ clearOnDefault: true }),
    transferReason: parseAsString
      .withDefault("")
      .withOptions({ clearOnDefault: true }),
    adjustedExchangeRate: parseAsString
      .withDefault("")
      .withOptions({ clearOnDefault: true }),
    exchangeRate: parseAsString
      .withDefault("")
      .withOptions({ clearOnDefault: true }),
  });

  const open = (
    id?: string,
    sentAmount?: string,
    receivedMaount?: string,
    reason?: string,
    adjustedExchangeRate?: string,
    exchangeRate?: string
  ) => {
    setQueryStates({
      confirm: true,
      sentAmount: sentAmount || "",
      receivedAmount: receivedAmount || "",
      recipientId: id || "",
      transferReason: reason || "",
      adjustedExchangeRate: adjustedExchangeRate || "",
      exchangeRate: exchangeRate || "",
    });
  };

  const close = () => {
    setQueryStates({
      confirm: false,
      sentAmount: "",
      receivedAmount: "",
      recipientId: "",
      transferReason: "",
      adjustedExchangeRate: "",
      exchangeRate: "",
    });
  };

  return {
    isOpen,
    sentAmount,
    receivedAmount,
    recipientId,
    transferReason,
    adjustedExchangeRate,
    exchangeRate,
  };
};
