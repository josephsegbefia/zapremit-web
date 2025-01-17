"use client";
import { DottedSeparator } from "@/components/shared-components/dotted-separator";
import { Button } from "@/components/ui/button";
import { useCurrent } from "@/features/auth/api/use-current";
import { useGetCustomerBeneficiaryCountry } from "@/features/customers/api/use-get-customer-beneficiary-country";
import { useGetRecipients } from "@/features/recipients/api/use-get-recipients";
import { columns } from "@/features/recipients/components/columns";
import { RecipientDataTable } from "@/features/recipients/components/recipient-data-table";
import { useCreateRecipientModal } from "@/features/recipients/hooks/use-create-recipient-modal";
import { Recipient } from "@/features/recipients/types";
import { Loader, UsersIcon } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { RiAddCircleFill } from "react-icons/ri";

const RecipientsPage = () => {
  const user = useCurrent();

  if (!user) redirect("/sign-in");

  const { open } = useCreateRecipientModal();
  const { data: recipients, isLoading } = useGetRecipients();
  const {
    data: beneficiaryCountry,
    isLoading: isLoadingBeneficiaryCountry,
    isFetching: isFetchingBeneficiaryCountry,
  } = useGetCustomerBeneficiaryCountry();

  const isBusy =
    isLoading || isLoadingBeneficiaryCountry || isFetchingBeneficiaryCountry;
  // Filter recipients by beneficiaryCountry.name
  const filteredRecipients = recipients?.documents.filter(
    (recipient) => recipient.country === beneficiaryCountry?.name
  );

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <p className="font-work-sans text-teal-800 text-md font-semibold">
          <span className="flex justify-center items-center gap-3">
            <UsersIcon />
            Recipients
          </span>
        </p>

        <div>
          <Button
            size="sm"
            className="bg-teal-600 text-white font-work-sans hover:bg-white hover:text-teal-800"
            onClick={open}
          >
            <span className="flex">
              <RiAddCircleFill className="size-4 mr-2" />
              New Recipient
            </span>
          </Button>
        </div>
      </div>
      {!isBusy && (
        <p className="text-teal-800 text-sm font-medium flex items-center gap-2">
          Displaying recipients for the selected beneficiary country:
          <Image
            src={beneficiaryCountry?.flagImageUrl || ""}
            alt="country flag"
            width={30}
            height={20}
            className="rounded-sm"
          />
          <span className="font-semibold">{beneficiaryCountry?.name}</span>.
        </p>
      )}

      <DottedSeparator />

      {isBusy ? (
        <div className="flex justify-center items-center mt-20">
          <Loader className="w-6 h-6 animate-spin text-teal-800" />
        </div>
      ) : (
        <>
          <RecipientDataTable
            data={filteredRecipients as Recipient[]}
            columns={columns}
          />
        </>
      )}
    </div>
  );
};

export default RecipientsPage;
