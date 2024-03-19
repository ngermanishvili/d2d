"use client";
import React, { useState, useTransition, useEffect } from "react";
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
  FormMessage,
} from "@/components/ui/form";
import { FormError } from "@/components/form-error";
import { UserRole } from "@prisma/client";
import { FormSuccess } from "@/components/form-success";
import ImageUpload from "@/components/ui/image-upload";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import usePhotoStore from "@/hooks/photo-store";
import { RoleGate } from "@/components/auth/role-gate";
import { Badge, Divider } from "antd";
import useAccountActiveStore from "@/hooks/is-account-active";

// components

export default function CardSettings() {
  const user = useCurrentUser();
  const isAdmin = UserRole.ADMIN;

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { active, setActive } = useAccountActiveStore();
  const handleClick = () => {
    setShowForm(true);
  };

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      userType: user?.userType || undefined,
      name: user?.name || undefined,
      number: user?.number || undefined,
      role: user?.role || undefined,
      image: user?.image || undefined,
      email: user?.email || undefined,
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
  const { setPhotoUrl, photoUrl } = usePhotoStore();

  const router = useRouter();
  useEffect(() => {
    if (
      user?.input1 &&
      user?.input2 &&
      user?.input3 &&
      user?.input4 &&
      user?.input5 &&
      user?.input6 &&
      user?.input7
    ) {
      setActive(true);
    }
  }, [user, setPhotoUrl]);
  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    if (
      values.input1 &&
      values.input2 &&
      values.input3 &&
      values.input4 &&
      values.input5 &&
      values.input6 &&
      values.input7 &&
      user?.role === "INACTIVEUSER"
    ) {
      values.role = UserRole.USER;
    }
    values.image = photoUrl;
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);

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
            <h6 className="text-blueGray-700 text-xl font-bold mt-4">
              ჩემი კაბინეტი
            </h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            პირადი ინფორმაცია
          </h6>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-wrap justify-start">
                {" "}
                <div className="w-full lg:w-6/12 px-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="relative w-full mb-3">
                        <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                          სახელი და გვარი
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
                    name="number"
                    render={({ field }) => (
                      <FormItem className="relative w-full mb-3">
                        <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                          ტელეფონის ნომერი
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
              <div className="flex flex-wrap">
                <RoleGate allowedRole="INACTIVEUSER">
                  {user?.input1 === null ||
                    user?.input1.length === 0 ||
                    user?.input1.length === 1 ? (
                    <>
                      <div className="w-full lg:w-6/12 px-4">
                        <FormField
                          control={form.control}
                          name="input1"
                          render={({ field }) => (
                            <FormItem className="relative w-full mb-3">
                              <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                {user?.userType === "ფიზიკური პირი"
                                  ? "მისამართი"
                                  : "იურიდიული მისამართი"}
                              </FormLabel>
                              <FormControl className="relative rounded-md shadow-sm">
                                <Input
                                  {...field}
                                  placeholder={
                                    user?.userType === "ფიზიკური პირი"
                                      ? "მისამართი"
                                      : "იურიდიული მისამართი"
                                  }
                                  disabled={isPending}
                                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                />
                              </FormControl>
                              <FormMessage className="mt-1 text-xs text-red-500" />
                            </FormItem>
                          )}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="p-2 relative w-full mb-3">
                      <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        {user?.userType === "ფიზიკური პირი"
                          ? "მისამართი"
                          : "იურიდიული მისამართი"}
                      </FormLabel>

                      <div className="border-0 text-center flex-col sm:flex-row px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 flex justify-center sm:justify-between">
                        <p>{user?.input1}</p>
                        <Badge
                          text={
                            user?.userType === "ფიზიკური პირი"
                              ? "მისამართის შესაცვლელად დაუკავშირდით ადმინისტრაციას"
                              : "იურიდიული მისამართის შესაცვლელად დაუკავშირდით ადმინისტრაციას"
                          }
                          color="red"
                        ></Badge>
                      </div>
                    </div>
                  )}
                  {user?.input2 === null ||
                    user?.input2.length === 0 ||
                    user?.input1.length === 1 ? (
                    <div className="w-full lg:w-6/12 px-4">
                      <FormField
                        control={form.control}
                        name="input2"
                        render={({ field }) => (
                          <FormItem className="relative w-full mb-3">
                            <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                              {user?.userType === "ფიზიკური პირი"
                                ? "პირადი ნომერი"
                                : "საიდენტიფიკაციო ნომერი"}
                            </FormLabel>
                            <FormControl className="relative rounded-md shadow-sm">
                              <Input
                                {...field}
                                placeholder={
                                  user?.userType === "ფიზიკური პირი"
                                    ? "პირადი ნომერი"
                                    : "საიდენტიფიკაციო ნომერი"
                                }
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
                  ) : (
                    <div className="p-2 relative w-full mb-3">
                      <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        {user?.userType === "ფიზიკური პირი"
                          ? "პირადი ნომერი"
                          : "საიდენტიფიკაციო ნომერი"}
                      </FormLabel>
                      <div className="border-0 text-center flex-col sm:flex-row px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 flex justify-center sm:justify-between">
                        <p>
                          <Badge />
                          {user?.input2}
                        </p>
                        <Badge
                          text={
                            user?.userType === "ფიზიკური პირი"
                              ? "პირადი ნომრის შესაცვლელად დაუკავშირდით ადმინისტრაციას"
                              : "საიდენთიფიკაციო ნომრის შესაცვლელად დაუკავშირდით ადმინისტრაციას"
                          }
                          color="red"
                        ></Badge>
                      </div>
                    </div>
                  )}
                </RoleGate>{" "}
                <RoleGate allowedRole="USER">
                  {user?.input1 === null ||
                    user?.input1.length === 0 ||
                    user?.input1.length === 1 ? (
                    <>
                      <div className="w-full lg:w-6/12 px-4">
                        <FormField
                          control={form.control}
                          name="input1"
                          render={({ field }) => (
                            <FormItem className="relative w-full mb-3">
                              <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                {user?.userType === "ფიზიკური პირი"
                                  ? "მისამართი"
                                  : "იურიდიული მისამართი"}
                              </FormLabel>
                              <FormControl className="relative rounded-md shadow-sm">
                                <Input
                                  {...field}
                                  placeholder={
                                    user?.userType === "ფიზიკური პირი"
                                      ? "მისამართი"
                                      : "იურიდიული მისამართი"
                                  }
                                  disabled={isPending}
                                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                />
                              </FormControl>
                              <FormMessage className="mt-1 text-xs text-red-500" />
                            </FormItem>
                          )}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="p-2 relative w-full mb-3">
                      <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        {user?.userType === "ფიზიკური პირი"
                          ? "მისამართი"
                          : "იურიდიული მისამართი"}
                      </FormLabel>

                      <div className="border-0 text-center flex-col sm:flex-row px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 flex justify-center sm:justify-between">
                        <p>{user?.input1}</p>
                        <Badge
                          text={
                            user?.userType === "ფიზიკური პირი"
                              ? "მისამართის შესაცვლელად დაუკავშირდით ადმინისტრაციას"
                              : "იურიდიული მისამართის შესაცვლელად დაუკავშირდით ადმინისტრაციას"
                          }
                          color="red"
                        ></Badge>
                      </div>
                    </div>
                  )}
                  {user?.input2 === null ||
                    user?.input2.length === 0 ||
                    user?.input1.length === 1 ? (
                    <div className="w-full lg:w-6/12 px-4">
                      <FormField
                        control={form.control}
                        name="input2"
                        render={({ field }) => (
                          <FormItem className="relative w-full mb-3">
                            <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                              {user?.userType === "ფიზიკური პირი"
                                ? "პირადი ნომერი"
                                : "საიდენტიფიკაციო ნომერი"}
                            </FormLabel>
                            <FormControl className="relative rounded-md shadow-sm">
                              <Input
                                {...field}
                                placeholder={
                                  user?.userType === "ფიზიკური პირი"
                                    ? "პირადი ნომერი"
                                    : "საიდენტიფიკაციო ნომერი"
                                }
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
                  ) : (
                    <div className="p-2 relative w-full mb-3">
                      <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        {user?.userType === "ფიზიკური პირი"
                          ? "პირადი ნომერი"
                          : "საიდენტიფიკაციო ნომერი"}
                      </FormLabel>
                      <div className="border-0 text-center flex-col sm:flex-row px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 flex justify-center sm:justify-between">
                        <p>
                          <Badge />
                          {user?.input2}
                        </p>
                        <Badge
                          text={
                            user?.userType === "ფიზიკური პირი"
                              ? "პირადი ნომრის შესაცვლელად დაუკავშირდით ადმინისტრაციას"
                              : "საიდენთიფიკაციო ნომრის შესაცვლელად დაუკავშირდით ადმინისტრაციას"
                          }
                          color="red"
                        ></Badge>
                      </div>
                    </div>
                  )}
                </RoleGate>
                <div className="w-full lg:w-6/12 px-4">
                  <FormField
                    control={form.control}
                    name="input3"
                    render={({ field }) => (
                      <FormItem className="relative w-full mb-3">
                        <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                          კომპანიის დასახელება
                        </FormLabel>
                        <FormControl className="relative rounded-md shadow-sm">
                          <Input
                            {...field}
                            placeholder="კომპანიის დასახელება"
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
                          საბანკო ანგარიშის ნომერი
                        </FormLabel>
                        <FormControl className="relative rounded-md shadow-sm">
                          <Input
                            {...field}
                            placeholder="საბანკო ანგარიშის ნომერი"
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
                          კომპანიის დირექტორი
                        </FormLabel>
                        <FormControl className="relative rounded-md shadow-sm">
                          <Input
                            {...field}
                            placeholder="კომპანიის დირექტორი"
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
                          საკონტაქტო ტელეფონი
                        </FormLabel>
                        <FormControl className="relative rounded-md shadow-sm">
                          <Input
                            {...field}
                            placeholder="საკონტაქტო ტელეფონი"
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
                          საქმიანობის სფერო
                        </FormLabel>
                        <FormControl className="relative rounded-md shadow-sm">
                          <Input
                            {...field}
                            placeholder="საქმიანობის სფერო"
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
                <div className="w-full lg:w-6/12 px-4 hidden">
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
                <RoleGate allowedRole="ADMIN">
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
                                ადმინი
                              </SelectItem>
                              <SelectItem value={UserRole.USER}>
                                მომხმარებელი
                              </SelectItem>
                              <SelectItem value={UserRole.COURIER}>
                                კურიერი
                              </SelectItem>
                              <SelectItem value={UserRole.ACCOUNTANT}>
                                ბუღალტერი
                              </SelectItem>
                              <SelectItem value={UserRole.MODERATOR}>
                                ადმინისტრატორი
                              </SelectItem>
                              <SelectItem value={UserRole.INACTIVEUSER}>
                                არა აქტიური
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </RoleGate>
              </div>
              <Divider />
              <div className="w-full lg:w-6/12 px-4 gap-10">
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6  uppercase font-bold text-md">
                  პაროლის შეცვლა
                </h6>
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
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button
                disabled={isPending}
                type="submit"
                className="aling-center mt-4 w-full"
              >
                შენახვა
              </Button>
            </form>
          </Form>
          <hr className="mt-6 border-b-1 border-blueGray-300" />
        </div>
      </div>
    </>
  );
}
