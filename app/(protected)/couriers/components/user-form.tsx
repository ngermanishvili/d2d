"use client";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { Shipment, UserRole } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NextURL } from "next/dist/server/web/next-url";
import { UsersColumn } from "./columns";
import { db } from "@/lib/db";
import { error } from "console";
import ImageUpload from "@/components/ui/image-upload";
import Image from "next/image";
import XlsxUpload from "@/components/ui/xlsx-upload";
import { RoleGate } from "@/components/auth/role-gate";
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};
const formSchema = z.object({
  name: z.optional(z.string()),
  role: z.enum([
    UserRole.ADMIN,
    UserRole.USER,
    UserRole.COURIER,
    UserRole.ACCOUNTANT,
  ]),
  email: z.optional(z.string().email()),
  number: z.optional(z.string()),

  image: z.optional(
    z.string().refine((url) => url === "" || isValidUrl(url), {
      message: "Invalid URL",
    })
  ),
  input1: z.optional(z.string()),
  input2: z.optional(z.string()),
  input3: z.optional(z.string()),
  input4: z.optional(z.string()),
  input5: z.optional(z.string()),
  input6: z.optional(z.string()),
  input7: z.optional(z.string()),
  input8: z.optional(z.string()),
});

type UserFormValues = z.infer<typeof formSchema>;

interface ShipmentFormProps {
  initialData: UsersColumn;
}

export const UserForm: React.FC<ShipmentFormProps> = ({ initialData }) => {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // const title = initialData ? "Edit Shipment" : "Create Shipment";
  // const description = initialData ? "Edit a Shipment" : "Add a new Shipment";
  const toastMessage = initialData ? "Shipment updated." : "Shipment created";
  const action = initialData ? "Save changes" : "Create";
  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      number: "",
      email: "",
      role: UserRole.USER,
      image: "",
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input5: "",
      input6: "",
      input7: "",
      input8: "",
    },
  });

  const [isPending, startTransition] = useState(false);
  const onSubmit = async (data: UserFormValues) => {
    setLoading(true);
    console.log(data);
    try {
      await axios.patch(`/api/couriers/${params.id}`, data);

      router.refresh();
      router.push(`/couriers`);
      toast.success("sagol daupdateda");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Separator />
      <XlsxUpload user={initialData.id} />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <RoleGate allowedRole="ACCOUNTANT">
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
                          disabled={loading}
                          placeholder="სახელი"
                          {...field}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem className="relative w-full mb-3">
                      <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        nomeri
                      </FormLabel>
                      <FormControl className="relative rounded-md shadow-sm">
                        <Input
                          disabled={loading}
                          placeholder="სახელი"
                          {...field}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                      </FormControl>
                      <FormMessage />
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
                        სახელი
                      </FormLabel>
                      <FormControl className="relative rounded-md shadow-sm">
                        <Input
                          disabled={loading}
                          placeholder="სახელი"
                          {...field}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="relative w-full mb-3">
                      <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        სტატუსი
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="relative rounded-md shadow-sm">
                          <SelectTrigger>
                            <SelectValue placeholder="აირჩიეთ თქვენი სტატუსი" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={UserRole.USER}>User</SelectItem>
                          <SelectItem value={UserRole.COURIER}>
                            Courier
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
              </div>
            </div>
          </RoleGate>
          <RoleGate allowedRole="ADMIN">
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
                          disabled={loading}
                          placeholder="სახელი"
                          {...field}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem className="relative w-full mb-3">
                      <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        nomeri
                      </FormLabel>
                      <FormControl className="relative rounded-md shadow-sm">
                        <Input
                          disabled={loading}
                          placeholder="სახელი"
                          {...field}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                      </FormControl>
                      <FormMessage />
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
                        სახელი
                      </FormLabel>
                      <FormControl className="relative rounded-md shadow-sm">
                        <Input
                          disabled={loading}
                          placeholder="სახელი"
                          {...field}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="relative w-full mb-3">
                      <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        სტატუსი
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="relative rounded-md shadow-sm">
                          <SelectTrigger>
                            <SelectValue placeholder="აირჩიეთ თქვენი სტატუსი" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={UserRole.USER}>User</SelectItem>
                          <SelectItem value={UserRole.COURIER}>
                            Courier
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
              </div>
            </div>
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
              </div>{" "}
              <div className="w-full lg:w-6/12 px-4">
                <FormField
                  control={form.control}
                  name="input2"
                  render={({ field }) => (
                    <FormItem className="relative w-full mb-3">
                      <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        input1
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
              </div>
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
              </div>
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
                  name="image"
                  render={({ field }) => (
                    <FormItem className="relative w-full mb-3">
                      <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        ატვირთეთ კომპანიის ლოგო
                      </FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value ? [field.value] : []}
                          onChange={(url) => field.onChange(url)}
                          onRemove={() => field.onChange("")}
                        />
                      </FormControl>
                      <FormMessage />
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
                          <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
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
          </RoleGate>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
{
  /* <div className="w-full px-4">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="relative w-full mb-3">
                    <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      surati
                    </FormLabel>
                    <FormControl className="relative rounded-md shadow-sm">
                      <Input
                        disabled={loading}
                        placeholder="surat"
                        {...field}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Image
                height={100}
                width={100}
                src={initialData?.image ? initialData.image : ""}
                alt="Company Picture"
              />
            </div> */
}
