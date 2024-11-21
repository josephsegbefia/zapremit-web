import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "@/components/shared-components/dotted-separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getCustomer } from "@/features/onboarding/queries";

const WelcomePage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const customer = await getCustomer();

  const firstName = user.name.split(" ")[0];
  // const customer = params.customerId;
  return (
    <Card className="w-[60%] h-full border-none shadow-none text-center">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">
          <p className="text-teal-900 font-work-sans">
            Welcome onboard, {user.name}
          </p>
        </CardTitle>
        <div className="px-10 py-3">
          <DottedSeparator />
        </div>
      </CardHeader>
      <CardContent className="p-7">
        <p className="text-teal-600 font-work-sans font-normal">
          Thank you, {firstName} for joining Zap Remit! Zap Remit makes sending
          money to Africa fast, secure, and affordable with instant transfers,
          low fees, and multiple payment options. Our goal is to create a safe
          and seamless experience for you. The next few screens will help us get
          to know you better and ensure your transactions are secure. We&apos;re
          excited to have you on board!
        </p>
        <div className="px-10 py-10">
          <DottedSeparator />
        </div>
        <Button
          asChild
          className="bg-teal-600 text-white font-work-sans hover:bg-white hover:text-teal-600 hover:border border-teal-600 w-[25%]"
        >
          <Link href={`/onboarding/${customer?.$id}/personal-information`}>
            Start
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default WelcomePage;
