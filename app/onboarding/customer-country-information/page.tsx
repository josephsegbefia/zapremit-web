import { getCurrent } from "@/features/auth/actions";
import CustomerCountryInformationForm from "@/features/customers/components/customer-country-information-form";
import {
  getBeneficiaryCountries,
  getOriginCountries,
} from "@/features/onboarding/queries";
import { redirect } from "next/navigation";
import React from "react";

const CustomerCountryInformation = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const originCountries = await getOriginCountries();
  const beneficiaryCountries = await getBeneficiaryCountries();

  return (
    <div className="w-full flex items-center justify-center">
      <CustomerCountryInformationForm
        // initialValues={initialValues}
        originCountries={originCountries}
        beneficiaryCountries={beneficiaryCountries}
        user={user}
      />
    </div>
  );
};

export default CustomerCountryInformation;
