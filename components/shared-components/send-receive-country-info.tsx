import { Models } from "node-appwrite";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { RecipientAvatar } from "@/features/recipients/components/recipients-avatar";
import { formatDate } from "@/lib/utils";
import { DottedSeparator } from "./dotted-separator";
import { Separator } from "../ui/separator";
import { UserProfileCountrySwitcher } from "./user-profile-country-switcher";
import { Button } from "../ui/button";
import Link from "next/link";
import { MoveRight, User } from "lucide-react";
import Image from "next/image";
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
    <Card className="lg:w-2/3 h-full border-none shadow-none w-full">
      <CardHeader className="flex px-7 py-3">
        <CardTitle className="text-xl flex justify justify-between font-work-sans font-bold text-teal-600 items-center">
          Sending & Receiving Countries
        </CardTitle>
        <p className="text-muted-foreground text-sm font-work-sans">
          Here you can change your receiving country. Contact support to change
          sending country.
        </p>
        <DottedSeparator className="mt-3 mb-5" />
      </CardHeader>
      <CardContent className="py-4">
        <div className="flex flex-row gap-5">
          <div className="bg-teal-50 px-10 py-2 rounded-lg flex items-center">
            <OriginCountryViewer originCountry={originCountry} />
          </div>
          <div className="flex items-center">
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
