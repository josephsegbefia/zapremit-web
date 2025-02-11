"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCustomerPersonalDetailsSchema } from "@/features/onboarding/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Customer } from "@/features/customers/types";
import { useRouter } from "next/navigation";
import { useUpdateCustomerPersonalInformation } from "@/features/onboarding/api/use-update-customer-personal-information";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { DottedSeparator } from "@/components/shared-components/dotted-separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Models } from "node-appwrite";
import DatePicker from "@/features/onboarding/components/date-picker";
import { Country } from "@/features/onboarding/types";

interface UpdateCustomerPersonalInfoFormProps {
  customer: Customer;
  user: Models.User<Models.Preferences>;
  customerOriginCountry: Country;
}
const UpdateCustomerPersonalInfoForm = ({
  customer,
  user,
  customerOriginCountry,
}: UpdateCustomerPersonalInfoFormProps) => {
  const router = useRouter();
  const { mutate, isPending } = useUpdateCustomerPersonalInformation();

  const form = useForm<z.infer<typeof updateCustomerPersonalDetailsSchema>>({
    resolver: zodResolver(updateCustomerPersonalDetailsSchema),
    defaultValues: {
      fullName: user.name,
      email: user.email,
      callingCode: customerOriginCountry.callingCode,
      phone: "",
      street: "",
      postcode: "",
      city: "",
      dateOfBirth: "",
    },
  });

  const onSubmit = (
    values: z.infer<typeof updateCustomerPersonalDetailsSchema>
  ) => {
    const finalValues = {
      ...values,
    };
    mutate(
      { json: finalValues, param: { customerId: customer.$id } },
      {
        onSuccess: () => {
          form.reset();
          router.push("/onboarding/kyc");
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
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardDescription className="text-sm text-center mb-3 font-work-sans text-teal-600">
        Tell us a bit more about yourself, now that you alos know about us.
      </CardDescription>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={() => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input value={user.name} disabled={true} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={() => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input value={user.email} disabled={true} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex flex-row gap-3">
                <div className="w-[30%]">
                  <FormField
                    control={form.control}
                    name="callingCode"
                    render={() => (
                      <FormItem>
                        <FormLabel>Calling Code</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Code"
                            value={customerOriginCountry.callingCode}
                            disabled={true}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-[70%]">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your phone number"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your street address"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex flex-row gap-3 justify-evenly">
                <div className="">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your city" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="">
                  <FormField
                    control={form.control}
                    name="postcode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Post Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter postal code" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="">
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={() => (
                      <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
                        <FormControl>
                          <DatePicker />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
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

export default UpdateCustomerPersonalInfoForm;
