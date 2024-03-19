"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SettingsSchema } from "@/schemas";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { settings } from "@/actions/settings";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { UserRole } from "@prisma/client";
import { Link } from "lucide-react";
import { RoleGate } from "@/components/auth/role-gate";
import ImageUpload from "@/components/ui/image-upload";
import styled from "styled-components";
import { Col, Row } from "antd";
import D2DLogo from "@/assets/images/d2d.jpg";
import Image from "next/image";
import { currentUser } from "@/lib/auth";

interface SettingsPageProps {
  amountOfShipments: number;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ amountOfShipments }) => {
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
    },
  });

  const isActive = user?.email && user?.number;
  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {

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
      <div className="profile-page mt-[250px]">
        <section className="">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-[150px]">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-[1100px] max-w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src="/img/team-2-800x800.jpg"
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      />
                    </div>
                  </div>

                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <Button
                        className="bg-green-200 uppercase text-gray font-bold shadow hover:text-white text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        აქტიური
                      </Button>
                    </div>
                  </div>

                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-md font-bold inline-block uppercase tracking-wide text-blueGray-600">
                          {`გამარჯობsdsdა ${user?.name}!`}
                        </span>
                      </div>

                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          {amountOfShipments ? amountOfShipments : ""}
                        </span>
                        <span className="text-sm text-blueGray-400">
                          შეკვეთები
                        </span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          89
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Comments
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="container  sm:w-full md:w-full">
                    <Form {...form}>
                      <form
                        className="space-y-6 md:w-1/2"
                        onSubmit={form.handleSubmit(onSubmit)}
                      >
                        <div className="flex justify-between items-center gap-4 h-[100px] ">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem className="mb-4 w-[800x]">
                                <FormLabel className="block mb-1 text-sm font-bold">
                                  სახელი
                                </FormLabel>
                                <FormControl className="relative rounded-md shadow-sm">
                                  <Input
                                    {...field}
                                    placeholder="John Doe"
                                    disabled={isPending}
                                    className="w-full md:w-[350px] sm:w-[200px]  mx-w-full"
                                  // className="block  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:border-blue-500 transition duration-150 ease-in-out text-sm"
                                  />
                                </FormControl>
                                <FormMessage className="mt-1 text-xs text-red-500" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="number"
                            render={({ field }) => (
                              <FormItem className="mb-4">
                                <FormLabel className="block mb-1 text-sm font-bold">
                                  ნომერი
                                </FormLabel>

                                <FormControl className="relative rounded-md shadow-sm">
                                  <Input
                                    {...field}
                                    placeholder="tqveni nom"
                                    disabled={isPending}
                                    className="w-full md:w-[350px] mx-w-full"
                                  />
                                </FormControl>
                                <FormMessage className="mt-1 text-xs text-red-500" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                              <FormItem className="mb-4">
                                <FormControl>
                                  <ImageUpload
                                    value={field.value ? [field.value] : []}
                                    onChange={(url) => { field.onChange(url) }}
                                    onRemove={() => field.onChange("")}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className=" mb-4 flex justify-between items-center gap-4 h-[100px]">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem className="mb-4">
                                <FormLabel className="block mb-1 text-sm font-bold">
                                  ელ-ფოსტა
                                </FormLabel>
                                <FormControl className="relative rounded-md shadow-sm">
                                  <Input
                                    {...field}
                                    placeholder="john.doe@example.com"
                                    type="email"
                                    disabled={isPending}
                                    className="w-full md:w-[350px] mx-w-full"
                                  />
                                </FormControl>
                                <FormMessage className="mt-1 text-xs text-red-500" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem className="mb-4">
                                <FormLabel className="block mb-1 text-sm font-bold">
                                  თქვენი პაროლი
                                </FormLabel>
                                <FormControl className="relative rounded-md shadow-sm">
                                  <Input
                                    {...field}
                                    placeholder="******"
                                    type="password"
                                    disabled={isPending}
                                    className="w-full md:w-[350px] mx-w-full"
                                  />
                                </FormControl>
                                <FormMessage className="mt-1 text-xs text-red-500" />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="newPassword"
                          render={({ field }) => (
                            <FormItem className="mb-4">
                              <FormLabel className="block mb-1 text-sm font-bold">
                                ახალი პაროლი
                              </FormLabel>
                              <FormControl className="relative rounded-md shadow-sm">
                                <Input
                                  {...field}
                                  placeholder="******"
                                  type="password"
                                  disabled={isPending}
                                />
                              </FormControl>
                              <FormMessage className="mt-1 text-xs text-red-500" />
                            </FormItem>
                          )}
                        />
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
                                  <SelectItem value={UserRole.USER}>
                                    User
                                  </SelectItem>
                                  <SelectItem value={UserRole.COURIER}>
                                    Courier
                                  </SelectItem>
                                  <SelectItem value={UserRole.MODERATOR}>
                                    Administrator
                                  </SelectItem>
                                  <SelectItem value={UserRole.INACTIVEUSER}>
                                    Administrator
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button disabled={isPending} type="submit">
                          Save
                        </Button>
                      </form>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  margin: 50px auto;
  height: 100%;
  background-color: antiquewhite;
  display: flex;
  justify-content: space-between;
`;

const StyledInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  margin-top: 4px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #4caf50; /* Update with your desired focus color */
  }

  &:disabled {
    background-color: #f2f2f2;
    cursor: not-allowed;
  }
`;

export default SettingsPage;
