import { getCurrent } from "@/features/auth/actions";
import UpdateCustomerPersonalInfoForm from "@/features/customers/components/update-customer-personal-info-form";
import { getCustomer } from "@/features/customers/queries";
import { redirect } from "next/navigation";

const CustomerPersonalInformationPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const customer = await getCustomer();

  if (!customer) {
    return null;
  }

  return (
    <div className="w-full flex items-center justify-center">
      <UpdateCustomerPersonalInfoForm customer={customer} user={user} />
    </div>
  );
};

export default CustomerPersonalInformationPage;
