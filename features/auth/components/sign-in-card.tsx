"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loginSchema } from "../schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { DottedSeparator } from "@/components/shared-components/dotted-separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLogin } from "../api/use-login";

export const SignInCard = () => {
  const { mutate, isPending } = useLogin();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    mutate({ json: values });
  };
  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Welcome back</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter email address"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter password"
                      disabled={isPending}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              size="lg"
              className="w-full"
              // variant="primary"
              disabled={isPending}
            >
              Sign In
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="p-x7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex flex-col gap-y-4">
        <Button
          variant="secondary"
          size="lg"
          className="w-full border border-neutral-100"
          disabled={isPending}
        >
          <FcGoogle className="mr-2 size-5" />
          Login with Google
        </Button>
        <Button
          variant="secondary"
          size="lg"
          className="w-full border border-neutral-100"
          disabled={isPending}
        >
          <FaGithub className="mr-2 size-5" />
          Login with GitHub
        </Button>
      </CardContent>
      <div>
        <DottedSeparator />
      </div>

      <CardContent className="p-7 flex items-center justify-center">
        <p>
          Don&apos;t have an account?
          <Link href="sign-up">
            <span className="text-blue-700">&nbsp;Sign up</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
