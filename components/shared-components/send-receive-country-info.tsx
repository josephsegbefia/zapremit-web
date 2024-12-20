/* eslint-disable @typescript-eslint/no-unused-vars */
import { Models } from "node-appwrite";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { DottedSeparator } from "./dotted-separator";

import { MoveRight } from "lucide-react";

import {
  getCustomerBeneficiaryCountry,
  getCustomerOriginCountry,
} from "@/features/customers/queries";
import BeneficiaryCountrySwitcher from "./beneficiary-country-switcher";
import OriginCountryViewer from "./origin-country-viewer";
import { getBeneficiaryCountries } from "@/features/onboarding/queries";

interface SendReceiveCountryInfoProps {
  user: Models.User<Models.Preferences>;
}
export const SendReceiveCountryInfo = async ({
  user,
}: SendReceiveCountryInfoProps) => {
  const originCountry = await getCustomerOriginCountry();
  const beneficiaryCountry = await getCustomerBeneficiaryCountry();
  const beneficiaryCountries = await getBeneficiaryCountries();

  if (!originCountry) {
    return null;
  }

  if (!beneficiaryCountry) {
    return null;
  }

  if (!beneficiaryCountries) {
    return null;
  }

  return (
    <Card className="lg:w-1/2 sm:h-[200px] md:h-[300px] lg:h-[200px] border-none shadow-none">
      <CardHeader className="flex px-7 py-3 md:flex-col">
        <CardTitle className="text-xl flex justify justify-between font-work-sans font-bold text-teal-600 items-center">
          Sending & Receiving Countries
        </CardTitle>
        <p className="text-muted-foreground text-sm font-work-sans">
          Here you can change your receiving country. Contact support to change
          sending country.
        </p>
        <DottedSeparator className="mt-3 mb-5" />
      </CardHeader>
      <CardContent className="py-2">
        <div className="flex lg:flex-row gap-5 flex-col justify-center">
          <div className="bg-teal-50 px-10 py-2 rounded-lg flex items-center">
            <OriginCountryViewer originCountry={originCountry} />
          </div>
          <div className="hidden lg:flex items-center">
            <MoveRight className="text-teal-600 size-4" />
          </div>
          <div className="bg-teal-50 px-10 py-2 rounded-lg flex">
            <BeneficiaryCountrySwitcher
              beneficiaryCountry={beneficiaryCountry}
              beneficiaryCountries={beneficiaryCountries}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
