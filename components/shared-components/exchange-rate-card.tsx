import { Country } from "@/features/onboarding/types";
import { Repeat } from "lucide-react";
import Image from "next/image";
import React from "react";

interface ExchangeRateCardProps {
  beneficiaryCountry?: Country;
  originCountry?: Country;
}

const ExchangeRateCard = ({
  beneficiaryCountry,
  originCountry,
}: ExchangeRateCardProps) => {
  if (!beneficiaryCountry) {
    return null;
  }

  if (!originCountry) {
    return null;
  }
  return (
    <div className="flex flex-row justify-around items-center">
      <Image
        src={originCountry.flagImageUrl}
        alt="country flag"
        width={60}
        height={50}
        className="mr-2 rounded-sm"
      />
      <Repeat className="text-teal-600 size-7" />
      <Image
        src={beneficiaryCountry.flagImageUrl}
        alt="country flag"
        width={60}
        height={50}
        className="mr-2 rounded-sm"
      />
    </div>
  );
};

export default ExchangeRateCard;
