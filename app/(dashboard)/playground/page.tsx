import InfoCard from "@/components/shared-components/info-card";
import { SendReceiveCountryInfo } from "@/components/shared-components/send-receive-country-info";
import { UserProfileCard } from "@/components/shared-components/user-profile-card";
import { getCurrent } from "@/features/auth/actions";
import {
  getCustomerBeneficiaryCountry,
  getCustomerOriginCountry,
} from "@/features/customers/queries";
import { TopRecipientsList } from "@/features/recipients/components/top-recipients-list";
// Import create recipient form

import { redirect } from "next/navigation";

export default async function Home() {
  const originCountry = await getCustomerOriginCountry();
  const beneficiaryCountry = await getCustomerBeneficiaryCountry();
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  if (!beneficiaryCountry) {
    return null;
  }

  if (!originCountry) {
    return null;
  }

  const lastTransfer = {
    recipientName: "Kofi Setsoafia",
    recipientNumber: "0504211501",
    transferAmount: "GHS 200",
    transferDate: new Date(),
    status: "success",
  };

  return (
    <>
      <section className="flex flex-col w-full gap-3 md:flex-row mb-10">
        <UserProfileCard user={user} />
        <SendReceiveCountryInfo user={user} />

        {/* <UserProfileCard user={user} /> */}
      </section>
      <section className="flex flex-col w-full gap-3 md:flex-row">
        <InfoCard
          title="Latest Transfer"
          recipientName={lastTransfer.recipientName}
          isTransferCard
          transferAmount={lastTransfer.transferAmount}
          // transferDate={lastTransfer.transferDate}
        />
        <InfoCard
          title="Current Exchange Rate"
          beneficiaryCountry={beneficiaryCountry}
          originCountry={originCountry}
        />
      </section>
      <section className="flex flex-col w-full gap-3 md:flex-row mt-10">
        <TopRecipientsList />
      </section>
    </>
  );
}
