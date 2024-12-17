"use client";
import { DottedSeparator } from "@/components/shared-components/dotted-separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { createRecipientSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RiAddCircleFill } from "react-icons/ri";
// import { Customer } from "@/features/customers/types";

interface CreateRecipientFormProps {
  onCancel?: () => void;
}

export const CreateRecipientForm = ({
  onCancel,
}: // customer,
CreateRecipientFormProps) => {
  const form = useForm<z.infer<typeof createRecipientSchema>>({
    resolver: zodResolver(createRecipientSchema.omit({ customerId: true })),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      street_address: "",
      city: "",
      send_transfer_update: false,
      callingCode: "",
    },
  });

  const onSubmit = (values: z.infer<typeof createRecipientSchema>) => {
    const finalValues = {
      ...values,
      // Add customerId
    };
    // Add mutate function here to create the recipient
  };
  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold font-work-sans text-teal-800">
          Add New Recipient
        </CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter recipient's full name"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient Email (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter recipient's email" {...field} />
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
                            placeholder="Country Code"
                            // value={customerOriginCountry.callingCode}
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
                            placeholder="Enter beneficiary phone number"
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
                name="street_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter beneficiary street address"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter recipient's city" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DottedSeparator className="py-7" />
            <div className="flex items-center justify-between">
              <Button
                type="button"
                size="lg"
                variant="destructive"
                onClick={onCancel}
                disabled={false}
                className={cn(!onCancel && "invisible")}
              >
                Cancel
              </Button>
              <Button type="submit" size="lg" disabled={false} variant="zap">
                <span className="flex justify-center items-center">
                  <RiAddCircleFill className="size-4 mr-2" />
                  Add Recipient
                </span>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};