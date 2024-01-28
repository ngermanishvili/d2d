"use client";
import React, { useState, useTransition } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useSession } from "next-auth/react";
import { SettingsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { settings } from "@/actions/settings";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { FormError } from "@/components/form-error";
import { UserRole } from "@prisma/client";
import { FormSuccess } from "@/components/form-success";
import ImageUpload from "@/components/ui/image-upload";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// components

export default function CardSettings() {
  const user = useCurrentUser();

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      name: user?.name || undefined,
      email: user?.email || undefined,
      role: user?.role || undefined,
      image: user?.image || undefined,
      number: user?.number || undefined,
      input1: user?.input1 || undefined,
      input2: user?.input2 || undefined,
      input3: user?.input3 || undefined,
      input4: user?.input4 || undefined,
      input5: user?.input5 || undefined,
      input6: user?.input6 || undefined,
      input7: user?.input7 || undefined,
      input8: user?.input8 || undefined,
    },
  });

  const router = useRouter();
  const isActive =
    user?.input1 &&
    user?.input2 &&
    user?.input3 &&
    user?.input4 &&
    user?.input5 &&
    user?.input6 &&
    user?.input7 &&
    user?.input8;
  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
            console.log(data.error);
          }

          if (data.success) {
            update();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">My account</h6>
            <button
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
            >
              Settings
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            User Information
          </h6>
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            {isActive
              ? "ანგარიში აქტიურია"
              : "ანგარიში არ არის აქტიური, გასააკტიურებლად შეავსეთ ყველა საჭირო ველი"}
          </h6>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="relative w-full mb-3">
                        <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                          სახელი
                        </FormLabel>
                        <FormControl className="relative rounded-md shadow-sm">
                          <Input
                            {...field}
                            placeholder="John Doe"
                            disabled={isPending}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            // className="block  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:border-blue-500 transition duration-150 ease-in-out text-sm"
                          />
                        </FormControl>
                        <FormMessage className="mt-1 text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="relative w-full mb-3">
                        <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                          იმეილი
                        </FormLabel>
                        <FormControl className="relative rounded-md shadow-sm">
                          <Input
                            {...field}
                            placeholder="John Doe"
                            disabled={isPending}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            // className="block  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:border-blue-500 transition duration-150 ease-in-out text-sm"
                          />
                        </FormControl>
                        <FormMessage className="mt-1 text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="relative w-full mb-3">
                        <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                          თქვენი პაროლი
                        </FormLabel>
                        <FormControl className="relative rounded-md shadow-sm">
                          <Input
                            {...field}
                            placeholder="******"
                            type="password"
                            disabled={isPending}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                        </FormControl>
                        <FormMessage className="mt-1 text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>{" "}
                <div className="w-full lg:w-6/12 px-4">
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem className="relative w-full mb-3">
                        <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                          ახალი პაროლი
                        </FormLabel>
                        <FormControl className="relative rounded-md shadow-sm">
                          <Input
                            {...field}
                            placeholder="******"
                            type="password"
                            disabled={isPending}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                        </FormControl>
                        <FormMessage className="mt-1 text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>{" "}
                <div className="w-full lg:w-6/12 px-4">
                  <FormField
                    control={form.control}
                    name="number"
                    render={({ field }) => (
                      <FormItem className="relative w-full mb-3">
                        <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                          number
                        </FormLabel>
                        <FormControl className="relative rounded-md shadow-sm">
                          <Input
                            {...field}
                            placeholder="nomeri"
                            type="text"
                            disabled={isPending}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                        </FormControl>
                        <FormMessage className="mt-1 text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                ანგარიშის გასააქტიურებლად შეავსეთ ყველა ველი ვალიდური
                ინფორმაციით
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <FormField
                    control={form.control}
                    name="input1"
                    render={({ field }) => (
                      <FormItem className="relative w-full mb-3">
                        <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                          input1
                        </FormLabel>
                        <FormControl className="relative rounded-md shadow-sm">
                          <Input
                            {...field}
                            placeholder="input1"
                            disabled={isPending}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            // className="block  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:border-blue-500 transition duration-150 ease-in-out text-sm"
                          />
                        </FormControl>
                        <FormMessage className="mt-1 text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <FormField
                    control={form.control}
                    name="input2"
                    render={({ field }) => (
                      <FormItem className="relative w-full mb-3">
                        <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                          input2
                        </FormLabel>
                        <FormControl className="relative rounded-md shadow-sm">
                          <Input
                            {...field}
                            placeholder="input2"
                            disabled={isPending}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            // className="block  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:border-blue-500 transition duration-150 ease-in-out text-sm"
                          />
                        </FormControl>
                        <FormMessage className="mt-1 text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>{" "}
                <div className="w-full lg:w-6/12 px-4">
                  <FormField
                    control={form.control}
                    name="input3"
                    render={({ field }) => (
                      <FormItem className="relative w-full mb-3">
                        <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                          input3
                        </FormLabel>
                        <FormControl className="relative rounded-md shadow-sm">
                          <Input
                            {...field}
                            placeholder="input3"
                            disabled={isPending}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            // className="block  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:border-blue-500 transition duration-150 ease-in-out text-sm"
                          />
                        </FormControl>
                        <FormMessage className="mt-1 text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>{" "}
                <div className="w-full lg:w-6/12 px-4">
                  <FormField
                    control={form.control}
                    name="input4"
                    render={({ field }) => (
                      <FormItem className="relative w-full mb-3">
                        <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                          input4
                        </FormLabel>
                        <FormControl className="relative rounded-md shadow-sm">
                          <Input
                            {...field}
                            placeholder="input4"
                            disabled={isPending}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            // className="block  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:border-blue-500 transition duration-150 ease-in-out text-sm"
                          />
                        </FormControl>
                        <FormMessage className="mt-1 text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>{" "}
                <div className="w-full lg:w-6/12 px-4">
                  <FormField
                    control={form.control}
                    name="input5"
                    render={({ field }) => (
                      <FormItem className="relative w-full mb-3">
                        <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                          input5
                        </FormLabel>
                        <FormControl className="relative rounded-md shadow-sm">
                          <Input
                            {...field}
                            placeholder="input5"
                            disabled={isPending}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            // className="block  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:border-blue-500 transition duration-150 ease-in-out text-sm"
                          />
                        </FormControl>
                        <FormMessage className="mt-1 text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>{" "}
                <div className="w-full lg:w-6/12 px-4">
                  <FormField
                    control={form.control}
                    name="input6"
                    render={({ field }) => (
                      <FormItem className="relative w-full mb-3">
                        <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                          input6
                        </FormLabel>
                        <FormControl className="relative rounded-md shadow-sm">
                          <Input
                            {...field}
                            placeholder="input6"
                            disabled={isPending}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            // className="block  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:border-blue-500 transition duration-150 ease-in-out text-sm"
                          />
                        </FormControl>
                        <FormMessage className="mt-1 text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>{" "}
                <div className="w-full lg:w-6/12 px-4">
                  <FormField
                    control={form.control}
                    name="input7"
                    render={({ field }) => (
                      <FormItem className="relative w-full mb-3">
                        <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                          input7
                        </FormLabel>
                        <FormControl className="relative rounded-md shadow-sm">
                          <Input
                            {...field}
                            placeholder="input7"
                            disabled={isPending}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            // className="block  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:border-blue-500 transition duration-150 ease-in-out text-sm"
                          />
                        </FormControl>
                        <FormMessage className="mt-1 text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>{" "}
                <div className="w-full lg:w-6/12 px-4">
                  <FormField
                    control={form.control}
                    name="input8"
                    render={({ field }) => (
                      <FormItem className="relative w-full mb-3">
                        <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                          input8
                        </FormLabel>
                        <FormControl className="relative rounded-md shadow-sm">
                          <Input
                            {...field}
                            placeholder="input8"
                            disabled={isPending}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            // className="block  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:border-blue-500 transition duration-150 ease-in-out text-sm"
                          />
                        </FormControl>
                        <FormMessage className="mt-1 text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel className="block mb-1 text-sm font-bold">
                          სტატუსი
                        </FormLabel>
                        <Select
                          disabled={isPending}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl className="">
                            <SelectTrigger>
                              <SelectValue placeholder="აირჩიეთ თქვენი სტატუსი" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={UserRole.ADMIN}>
                              Admin
                            </SelectItem>
                            <SelectItem value={UserRole.USER}>User</SelectItem>
                            <SelectItem value={UserRole.COURIER}>
                              Courier
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button
                disabled={isPending}
                type="submit"
                className="aling-center"
              >
                Save
              </Button>
            </form>
          </Form>

          <hr className="mt-6 border-b-1 border-blueGray-300" />
        </div>
      </div>
    </>
  );
}
