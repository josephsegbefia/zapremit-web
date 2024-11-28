import { Country } from "@/features/onboarding/types";
import Image from "next/image";
import React from "react";

interface OriginCountryViewerProps {
  originCountry: Country;
}
const OriginCountryViewer = ({ originCountry }: OriginCountryViewerProps) => {
  return (
    <div className="flex items-center gap-1">
      <Image
        src={originCountry.flagImageUrl}
        alt="country flag"
        width={30}
        height={20}
        className="mr-2 rounded-sm"
      />
      <p className="font-work-sans text-sm font-semibold">
        {originCountry.name}
      </p>
      <p className="font-work-sans text-sm font-semibold">
        ({originCountry.currencySymbol})
      </p>
    </div>
  );
};

export default OriginCountryViewer;
