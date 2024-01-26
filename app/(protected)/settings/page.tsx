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
import { CabinetHeading } from "./_components/settings-header";
import styled from "styled-components";
import { Col, Row } from 'antd';
import D2DLogo from '@/assets/images/d2d.jpg'
import Image from "next/image";




const SettingsPage = () => {
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
      <Wrapper className="flex flex-col md:flex-row md:space-x-4">
        <div className="flex flex-col md:flex-row md:space-x-4 ">
          <Form {...form}>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="block mb-1 text-sm font-bold">ფოტო</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange('')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <form className="space-y-6 md:w-1/2" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mb-4 w-[800x]">
                      <FormLabel className="block mb-1 text-sm font-bold">სახელი</FormLabel>
                      <FormControl className="relative rounded-md shadow-sm">
                        <StyledInput
                          {...field}
                          placeholder="John Doe"
                          disabled={isPending}
                          className="block  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:border-blue-500 transition duration-150 ease-in-out text-sm"
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
                      <FormLabel className="block mb-1 text-sm font-bold">ნომერი</FormLabel>

                      <FormControl className="relative rounded-md shadow-sm">
                        <StyledInput
                          {...field}
                          placeholder="tqveni nom"
                          disabled={isPending}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:border-blue-500 transition duration-150 ease-in-out text-sm"

                        />
                      </FormControl>
                      <FormMessage className="mt-1 text-xs text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="block mb-1 text-sm font-bold">ელ-ფოსტა</FormLabel>
                      <FormControl className="relative rounded-md shadow-sm">
                        <StyledInput
                          {...field}
                          placeholder="john.doe@example.com"
                          type="email"
                          disabled={isPending}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:border-blue-500 transition duration-150 ease-in-out text-sm"
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
                      <FormLabel className="block mb-1 text-sm font-bold">თქვენი პაროლი</FormLabel>
                      <FormControl className="relative rounded-md shadow-sm">
                        <StyledInput
                          {...field}
                          placeholder="******"
                          type="password"
                          disabled={isPending}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:border-blue-500 transition duration-150 ease-in-out text-sm"

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
                    <FormItem className="mb-4">
                      <FormLabel className="block mb-1 text-sm font-bold">ახალი პაროლი</FormLabel>
                      <FormControl className="relative rounded-md shadow-sm">
                        <StyledInput
                          {...field}
                          placeholder="******"
                          type="password"
                          disabled={isPending}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:border-blue-500 transition duration-150 ease-in-out text-sm"

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
                      <FormLabel className="block mb-1 text-sm font-bold">სტატუსი</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="relative rounded-md shadow-sm w-[350px] ">
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
              <div>

              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button disabled={isPending} type="submit">
                Save
              </Button>
            </form>

            <form className="space-y-8 md:w-1/2" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mb-4 w-[800x]">
                      <FormLabel className="block mb-1 text-sm font-bold">სახელი</FormLabel>
                      <FormControl className="relative rounded-md shadow-sm">
                        <StyledInput
                          {...field}
                          placeholder="John Doe"
                          disabled={isPending}
                          className="block  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:border-blue-500 transition duration-150 ease-in-out text-sm"
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
                      <FormLabel className="block mb-1 text-sm font-bold">ნომერი</FormLabel>

                      <FormControl className="relative rounded-md shadow-sm">
                        <StyledInput
                          {...field}
                          placeholder="tqveni nom"
                          disabled={isPending}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:border-blue-500 transition duration-150 ease-in-out text-sm"

                        />
                      </FormControl>
                      <FormMessage className="mt-1 text-xs text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="block mb-1 text-sm font-bold">ელ-ფოსტა</FormLabel>
                      <FormControl className="relative rounded-md shadow-sm">
                        <StyledInput
                          {...field}
                          placeholder="john.doe@example.com"
                          type="email"
                          disabled={isPending}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:border-blue-500 transition duration-150 ease-in-out text-sm"
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
                      <FormLabel className="block mb-1 text-sm font-bold">თქვენი პაროლი</FormLabel>
                      <FormControl className="relative rounded-md shadow-sm">
                        <StyledInput
                          {...field}
                          placeholder="******"
                          type="password"
                          disabled={isPending}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:border-blue-500 transition duration-150 ease-in-out text-sm"

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
                    <FormItem className="mb-4">
                      <FormLabel className="block mb-1 text-sm font-bold">ახალი პაროლი</FormLabel>
                      <FormControl className="relative rounded-md shadow-sm">
                        <StyledInput
                          {...field}
                          placeholder="******"
                          type="password"
                          disabled={isPending}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:border-blue-500 transition duration-150 ease-in-out text-sm"

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
                      <FormLabel className="block mb-1 text-sm font-bold">სტატუსი</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="relative rounded-md shadow-sm w-[350px] ">
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
              <div>
              </div>
            </form>
          </Form>

        </div>
        <Image
          className="w-[100px] h-[100px] cursor-pointer rounded-full mr-[100px] "
          src={D2DLogo}
          height="80"
          width="80"
          alt="Logo"
        />
      </Wrapper>

    </>
  );
};




const Wrapper = styled.div`
width: 100%;
margin: 50px auto;
height: 100%;
background-color: antiquewhite;
display: flex;
justify-content: space-between

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
