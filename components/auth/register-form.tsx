"use client";

import * as z from "zod";

import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CardWrapper } from "./card-wrapper";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RegisterSchema } from "@/schemas";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { register } from "@/actions/register";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [type, setType] = useState("ფიზიკური პირი");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm: "", // Add this line
      name: "",
      number: "",
      userType: "ფიზიკური პირი",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    values.userType = type;
    startTransition(() => {
      register(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <>
      <div className=" mt-5 flex items-center justify-center p-[60px]">
        <CardWrapper
          headerLabel="რეგისტრაცია"
          backButtonLabel="გაქვთ უკვე ანგარიში?"
          backButtonHref="/auth/login"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  disabled={isPending}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">ელ-ფოსტა</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" placeholder="ელ-ფოსტა" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  disabled={isPending}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name">სახელი და გვარი</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="სახელი და გვარი" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
                <FormField
                  control={form.control}
                  name="number"
                  disabled={isPending}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="number">ტელეფონი</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="ნომერი" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  disabled={isPending}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">პაროლი</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="********"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirm"
                  disabled={isPending}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="confirm">გაიმეორეთ პაროლი</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="********"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="userType"
                  render={({ field }) => (
                    <FormItem className="relative w-full mb-3 bg-white  border-none outline-none">
                      <FormLabel className=" block uppercase text-blueGray-600 text-xs font-bold mb-2 bg-transparent">
                        აირჩიეთ თქვენი ანგარიშის ტიპი
                      </FormLabel>
                      <FormControl className="relative rounded-md shadow-sm outline-0 border-none">
                        <Select
                          value={field.value}
                          onValueChange={(newValue) => {
                            field.onChange(newValue);
                            setType(newValue);
                          }}
                        >
                          <SelectTrigger className="h-[50px]">
                            <SelectValue>{field.value}</SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {/* {ADMIN როლგეითი} */}
                            <SelectItem value="ფიზიკური პირი">
                              ფიზიკური პირი
                            </SelectItem>
                            <SelectItem value="იურიდიული პირი">
                              იურიდიული პირი
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />

              <Button typeof="submit" className="w-full" disabled={isPending}>
                რეგისტრაცია
              </Button>
            </form>
          </Form>
        </CardWrapper>
      </div>
    </>
  );
};
