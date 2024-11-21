import { Country } from "@/features/onboarding/types";
import { Models } from "node-appwrite";
import React from "react";

interface CustomerCountryInformationFormProps {
  user: Models.User<Models.Preferences>;
  originCountries: Country;
  beneficiaryCountries: Country;
}
const CustomerCountryInformationForm = ({
  user,
  originCountries,
  beneficiaryCountries,
}: CustomerCountryInformationFormProps) => {
  return <div>CustomerCountryInformationForm</div>;
};

export default CustomerCountryInformationForm;
