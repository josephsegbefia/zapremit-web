"use client";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Country } from "@/features/onboarding/types";
import Image from "next/image";
import { useUpdateCustomerBeneficiaryCountry } from "@/features/customers/api/use-update-customer-beneficiary-country";
import { useInvalidateBeneficiaryCountry } from "@/features/customers/hooks/use-invalidate-beneficiary-country";
// import { useRouter } from "next/navigation";

interface BeneficiaryCountrySwitcherProps {
  beneficiaryCountry: Country;
  beneficiaryCountries: Country[];
}
const BeneficiaryCountrySwitcher = ({
  beneficiaryCountry,
  beneficiaryCountries,
}: BeneficiaryCountrySwitcherProps) => {
  const { invalidateBeneficiaryCountry } = useInvalidateBeneficiaryCountry();
  const [selectedCountry, setSelectedCountry] = useState(beneficiaryCountry);
  const [countries, setCountries] = useState<Country[]>([]);

  const { mutate } = useUpdateCustomerBeneficiaryCountry();

  useEffect(() => {
    setCountries(beneficiaryCountries);
  }, []);

  const onSelect = (value: string) => {
    const selected = countries.find((country) => country.name === value);
    if (selected) {
      setSelectedCountry(selected);
      mutate(
        {
          json: { countryId: selected.$id },
        },
        {
          onSuccess: () => {
            invalidateBeneficiaryCountry();
          },
        }
      );
    }
  };

  return (
    <Select onValueChange={onSelect} value={selectedCountry.name}>
      <SelectTrigger className="w-full font-medium p-1 border-none shadow-none focus:ring-0 focus:outline-none">
        <Image
          src={selectedCountry.flagImageUrl}
          alt="country flag"
          width={30}
          height={20}
          className="mr-2 rounded-sm"
        />
        <span className="font-work-sans text-sm font-semibold mr-1  text-teal-800">
          {selectedCountry.name}
        </span>
        <span className="font-work-sans text-sm font-semibold mr-1  text-teal-800">
          ({selectedCountry.currencySymbol})
        </span>
        <span className="font-work-sans text-sm font-semibold mr-4  text-teal-800">
          {selectedCountry.currencyCode}
        </span>
      </SelectTrigger>
      <SelectContent className="w-full border-none shadow-none">
        {countries.map((country) => (
          <SelectItem key={country.$id} value={country.name}>
            <div className="flex items-center gap-2 ">
              <Image
                src={country.flagImageUrl}
                alt="country flag"
                width={30}
                height={20}
                className="mr-2 rounded-sm"
              />
              <span className="font-work-sans text-sm font-semibold mr-2 text-teal-800">
                {country.name}
              </span>
              <span className="font-work-sans text-sm font-semibold mr-2 text-teal-800">
                ({country.currencySymbol})
              </span>
              <span className="font-work-sans text-sm font-semibold mr-2  text-teal-800">
                {country.currencyCode}
              </span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default BeneficiaryCountrySwitcher;
