import { getCurrent } from "@/features/auth/actions";
import UpdateCustomerPersonalInfoForm from "@/features/customers/components/update-customer-personal-info-form";
import { getCustomer } from "@/features/onboarding/queries";
import { redirect } from "next/navigation";

const CustomerPersonalInformationPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const initialValues = await getCustomer();

  if (!initialValues) {
    return null;
  }

  return (
    <div className="w-full flex items-center justify-center">
      <UpdateCustomerPersonalInfoForm
        initialValues={initialValues}
        user={user}
      />
    </div>
  );
};

export default CustomerPersonalInformationPage;
