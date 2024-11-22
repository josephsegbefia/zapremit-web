import { getCurrent } from "@/features/auth/actions";
import CustomerCountryInformationForm from "@/features/customers/components/customer-country-information-form";
import { getCustomer } from "@/features/customers/queries";
import {
  getBeneficiaryCountries,
  getOriginCountries,
} from "@/features/onboarding/queries";
import { redirect } from "next/navigation";
import React from "react";

const CustomerCountryInformation = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const customer = await getCustomer();

  if (!customer?.$id) {
    return null;
  }

  const originCountries = await getOriginCountries();
  const beneficiaryCountries = await getBeneficiaryCountries();

  return (
    <div className="w-full flex items-center justify-center">
      <CustomerCountryInformationForm
        // initialValues={initialValues}
        originCountries={originCountries}
        beneficiaryCountries={beneficiaryCountries}
        user={user}
        customerId={customer?.$id}
      />
    </div>
  );
};

export default CustomerCountryInformation;
