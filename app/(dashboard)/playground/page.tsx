import InfoCard from "@/components/shared-components/info-card";
import { getCurrent } from "@/features/auth/actions";
// Import create recipient form

import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrent();
  console.log({ user });

  if (!user) redirect("/sign-in");

  const lastTransfer = {
    recipientName: "Kofi Setsoafia",
    recipientNumber: "0504211501",
    transferAmount: "GHS 200",
    transferDate: new Date(),
    status: "success",
  };

  return (
    <>
      <section className="flex flex-col w-full gap-3 md:flex-row">
        <InfoCard
          title="Last Transfer"
          recipientName={lastTransfer.recipientName}
          isTransferCard
          transferAmount={lastTransfer.transferAmount}
          transferDate={lastTransfer.transferDate}
        />
        <InfoCard title="Current Exchange Rate" />
      </section>
      <section></section>
    </>
  );
}
