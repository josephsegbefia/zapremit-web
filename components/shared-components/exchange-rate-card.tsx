"use client";
import { ArrowRightLeft, Loader, MoveRight, Send } from "lucide-react";
import Image from "next/image";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { DottedSeparator } from "./dotted-separator";
import { useGetCustomerBeneficiaryCountry } from "@/features/customers/api/use-get-customer-beneficiary-country";
import { useGetCustomerOriginCountry } from "@/features/customers/api/use-get-customer-origin-country";
import { useGetExchangeRate } from "@/features/exchange/api/use-get-exchange-rate";

const ExchangeRateCard = () => {
  const {
    data: beneficiaryCountry,
    isLoading: isLoadingBeneficiaryCountry,
    isFetching: isFetchingBeneficiaryCountry,
  } = useGetCustomerBeneficiaryCountry();

  const { data: originCountry, isLoading: isLoadingOriginCountry } =
    useGetCustomerOriginCountry();

  const base = originCountry?.currencyCode || "EUR"; // Default fallback
  const target = beneficiaryCountry?.currencyCode || "GHS"; // Default fallback

  const {
    data,
    isLoading: isLoadingRate,
    // error,
  } = useGetExchangeRate({ base, target });

  const isLoading =
    isLoadingBeneficiaryCountry || isLoadingOriginCountry || isLoadingRate;

  // Return null if critical data is missing and not loading
  if (!isLoading && (!beneficiaryCountry || !originCountry)) {
    return null;
  }

  console.log(data);

  return (
    <Card className="w-full h-full border-none shadow-none">
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
                <Loader className="w-4 h-4 animate-spin text-teal-800" />
              </div>
            )}
          </div>
        )}
      </CardContent>
      <DottedSeparator className="py-3 px-3" />
      <CardFooter className="flex items-center justify-center mt-3">
        {isLoading ? (
          <>
            <p className="font-semibold text-sm text-teal-800">
              Loading exchange rate, please wait...
            </p>
          </>
        ) : (
          <div className="flex lg:flex-row gap-5 flex-col justify-center">
            <div className="bg-teal-50 px-10 py-2 rounded-lg flex items-center">
              <span className="font-work-sans text-sm font-semibold  text-teal-800">
                1 {base}
              </span>
            </div>
            <div className="hidden sm:flex items-center">
              <MoveRight className="text-teal-600 size-4" />
            </div>
            <div className="bg-teal-50 px-10 py-2 rounded-lg flex">
              <span className="font-work-sans text-sm font-semibold  text-teal-800">
                {data} {target}
              </span>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ExchangeRateCard;
