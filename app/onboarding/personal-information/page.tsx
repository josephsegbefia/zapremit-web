import { getCurrent } from "@/features/auth/actions";
import UpdateCustomerPersonalInfoForm from "@/features/customers/components/update-customer-personal-info-form";
import {
  getCustomer,
  getCustomerOriginCountry,
} from "@/features/customers/queries";
import { redirect } from "next/navigation";

const CustomerPersonalInformationPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const customer = await getCustomer();
  const customerOriginCountry = await getCustomerOriginCountry();

  if (!customer) {
    return null;
  }

  if (!customerOriginCountry) {
    return null;
  }

  return (
    <div className="w-full flex items-center justify-center">
      <UpdateCustomerPersonalInfoForm
        customer={customer}
        user={user}
        customerOriginCountry={customerOriginCountry}
      />
    </div>
  );
};

export default CustomerPersonalInformationPage;
