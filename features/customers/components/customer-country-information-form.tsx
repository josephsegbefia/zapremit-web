"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useUpdateCustomerCountriesInformation } from "@/features/onboarding/api/use-update-customer-countries-information";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Country } from "@/features/onboarding/types";
import { ArrowLeftIcon } from "lucide-react";
import { DottedSeparator } from "@/components/shared-components/dotted-separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Models } from "node-appwrite";
import { updateCustomerCountriesInfoSchema } from "@/features/onboarding/schemas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Customer } from "../types";

interface CustomerCountryInformationFormProps {
  user: Models.User<Models.Preferences>;
  originCountries: any;
  beneficiaryCountries: any;
  customerId: Customer["$id"];
}
const CustomerCountryInformationForm = ({
  user,
  originCountries,
  beneficiaryCountries,
  customerId,
}: CustomerCountryInformationFormProps) => {
  const router = useRouter();
  const { mutate, isPending } = useUpdateCustomerCountriesInformation();

  const form = useForm<z.infer<typeof updateCustomerCountriesInfoSchema>>({
    resolver: zodResolver(updateCustomerCountriesInfoSchema),
    defaultValues: {
      originCountryId: originCountries[0]?.$id || "",
      beneficiaryCountryId: beneficiaryCountries[0]?.$id || "",
    },
  });

  const onSubmit = (
    values: z.infer<typeof updateCustomerCountriesInfoSchema>
  ) => {
    mutate(
      {
        json: values,
        param: { customerId: customerId },
      },
      {
        onSuccess: () => {
          router.push("/onboarding/personal-information");
        },
      }
    );
  };

  return (
    <Card className="w-[50%] h-full border-none shadow-none">
      <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
        <Button size="sm" variant="secondary">
          <ArrowLeftIcon className="size-4 mr-2" />
          Back
        </Button>
        <CardTitle className="text-xl font-bold font-work-sans text-teal-800">
          Country Information
        </CardTitle>
      </CardHeader>
      <CardDescription className="text-sm text-center mb-3 font-work-sans text-teal-600">
        We kindly ask for your location and the destination of the money you
        intend to send.
      </CardDescription>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-10">
              <FormField
                control={form.control}
                name="originCountryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Where are you located?</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isPending}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                        <SelectContent>
                          {originCountries.map((country: Country) => (
                            <SelectItem
                              key={country.name}
                              value={country.$id}
                              className="text-sm font-semibold"
                            >
                              <div className="flex flex-row justify-around gap-2">
                                <Image
                                  src={country.flagImageUrl}
                                  alt={`${country.name} flag`}
                                  width={30}
                                  height={20}
                                  className="mr-2 rounded-sm"
                                />
                                {country.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormMessage />

              <FormField
                control={form.control}
                name="beneficiaryCountryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Where are you sending money to?</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isPending}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your beneficiary country" />
                        </SelectTrigger>
                        <SelectContent>
                          {beneficiaryCountries.map((country: Country) => (
                            <SelectItem
                              key={country.name}
                              value={country.$id}
                              className="text-sm font-semibold"
                            >
                              <div className="flex flex-row justify-around gap-2">
                                <Image
                                  src={country.flagImageUrl}
                                  alt={`${country.name} flag`}
                                  width={30}
                                  height={20}
                                  className="mr-2 rounded-sm"
                                />
                                {country.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormMessage />
            </div>
            <div className="py-7">
              <DottedSeparator />
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={isPending}
              className="bg-teal-800"
            >
              Save & continue
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CustomerCountryInformationForm;
