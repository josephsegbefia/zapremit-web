"use client";

import { z } from "zod";
import { useFetchRecipient } from "../api/use-fetch-recipient";
import { useUpdateRecipientModal } from "../hooks/use-update-recipient-modal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "@/components/shared-components/dotted-separator";
import { Loader, Save } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateRecipientSchema } from "../schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

import { useUpdateRecipient } from "../api/use-update-recipient";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface UpdateRecipientFormProps {
  onCancel?: () => void;
}

export const UpdateRecipientForm = ({ onCancel }: UpdateRecipientFormProps) => {
  const { recipientId } = useUpdateRecipientModal();
  const { data, isLoading, error } = useFetchRecipient(recipientId);
  const { mutate, isPending } = useUpdateRecipient();

  const form = useForm<z.infer<typeof updateRecipientSchema>>({
    resolver: zodResolver(updateRecipientSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      street_address: "",
      city: "",
      send_transfer_update: false,
      callingCode: "",
      country: "",
    },
  });

  // Update the form values when the data is fetched
  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name || "",
        phone: data.phone || "",
        email: data.email || "",
        street_address: data.street_address || "",
        city: data.city || "",
        send_transfer_update: data.send_transfer_update || false,
        callingCode: data.callingCode || "",
        country: data.country || "",
      });
    }
  }, [data, form]);

  const onSubmit = (values: z.infer<typeof updateRecipientSchema>) => {
    const finalValues = {
      ...values,
    };

    mutate(
      { json: finalValues, param: { recipientId: recipientId } },
      {
        onSuccess: () => {
          if (onCancel) {
            onCancel();
          }
        },
      }
    );
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold font-work-sans text-teal-800">
          {data ? `Change ${data.name}'s data` : "Loading recipient data"}
        </CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        {isLoading ? (
          <div className="flex flex-col justify-center items-center">
            <Loader className="w-4 h-4 animate-spin text-teal-800" />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">
            Error loading recipient data.
          </div>
        ) : (
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
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
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
                        <Input
                          placeholder="Enter recipient's email"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex flex-row gap-3">
                  <div className="w-[30%]">
                    <FormField
                      control={form.control}
                      name="callingCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Calling Code</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Country Code"
                              {...field}
                              disabled
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
                              placeholder="Enter recipient phone number"
                              {...field}
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
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
                          placeholder="Enter recipient street address"
                          {...field}
                          disabled={isPending}
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
                        <Input
                          placeholder="Enter recipient's city"
                          {...field}
                          disabled={isPending}
                        />
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
                  disabled={isPending}
                  className={cn(!onCancel && "invisible")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isPending}
                  variant="zap"
                >
                  <span className="flex justify-center items-center">
                    {/* <RiAddCircleFill className="size-4 mr-2" /> */}
                    <Save className="size-4 mr-2" />
                    Save
                  </span>
                </Button>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};
