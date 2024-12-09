"use client";
import { ArrowRightLeft, Loader, Send } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { DottedSeparator } from "./dotted-separator";
import { useGetCustomerBeneficiaryCountry } from "@/features/customers/api/use-get-customer-beneficiary-country";
import { useGetCustomerOriginCountry } from "@/features/customers/api/use-get-customer-origin-country";

const ExchangeRateCard = () => {
  const {
    data: beneficiaryCountry,
    isLoading: isLoadingBeneficiaryCountry,
    isFetching: isFetchingBeneficiaryCountry,
  } = useGetCustomerBeneficiaryCountry();

  const { data: originCountry, isLoading: isLoadingOriginCountry } =
    useGetCustomerOriginCountry();

  const isLoading = isLoadingBeneficiaryCountry || isLoadingOriginCountry;

  // Return null if critical data is missing and not loading
  if (!isLoading && (!beneficiaryCountry || !originCountry)) {
    return null;
  }

  return (
    <Card className="w-1/2 h-full border-none shadow-none">
      <CardHeader className="flex px-7 py-3">
        <CardTitle className="text-xl flex justify-between font-work-sans font-bold text-teal-600">
          Current Exchange Rate
          <Button
            asChild
            size="sm"
            className="bg-teal-600 font-work-sans text-white hover:bg-white hover:text-teal-600 border hover:border-teal-600 cursor-pointer"
          >
            <Link href="/">
              <Send />
              Send Money Now
            </Link>
          </Button>
        </CardTitle>
        <DottedSeparator className="mt-4" />
      </CardHeader>
      <CardContent className="px-7 py-3 flex justify-center items-center">
        {isLoading ? (
          <Loader className="w-6 h-6 animate-spin text-teal-800" />
        ) : (
          <div className="flex flex-row justify-around items-center w-full relative">
            <Image
              src={originCountry?.flagImageUrl || "/placeholder-flag.png"}
              alt="Origin Country Flag"
              width={60}
              height={50}
              className="mr-2 rounded-sm"
            />
            <ArrowRightLeft className="text-teal-600 w-7 h-7" />
            <Image
              src={beneficiaryCountry?.flagImageUrl || "/placeholder-flag.png"}
              alt="Beneficiary Country Flag"
              width={60}
              height={50}
              className="mr-2 rounded-sm"
            />
            {isFetchingBeneficiaryCountry && (
              <div className="absolute top-0 right-0">
                <Loader className="w-4 h-4 animate-spin text-teal-600" />
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExchangeRateCard;
