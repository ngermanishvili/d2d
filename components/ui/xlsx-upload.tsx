"use client";
import { CldUploadWidget } from "next-cloudinary";
import * as z from "zod";

import { useEffect, useState } from "react";
import { ImageIcon, TrashIcon } from "@radix-ui/react-icons";
import usePhotoStore from "@/hooks/photo-store";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";

interface XlsxUploadProps {
  user: string;
}
type UploadXlsxValues = z.infer<typeof formSchema>;
const formSchema = z.object({

  name: z.string().min(1, {
    message: "სახელი უნდა შეიცავდეს მინიმუმ 1 სიმბოლოს კოკეხ",
  }),

  url: z.string(),
  userId: z.string(),
  sruliPasebisjami: z.string().min(1, {
    message: "სრული ფასების ჯამი უნდა შეიცავდეს მინიმუმ 1 სიმბოლოს ",
  }),
  sruliPasebisMinusJami: z.string().min(1, {
    message: "სრული ფასების მინუს ჯამი უნდა შეიცავდეს მინიმუმ 1 სიმბოლოს ",

  }),
  wonisPasebisJami: z.string().min(1, {
    message: "წონის ფასების ჯამი უნდა შეიცავდეს მინიმუმ 1 სიმბოლოს ",

  }),
  servisisPasebisJami: z.string().min(1, {
    message: "სერვისის ფასების ჯამი უნდა შეიცავდეს მინიმუმ 1 სიმბოლოს ",

  }),

});
const ImageUpload: React.FC<XlsxUploadProps> = ({ user }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [url, setUrl] = useState("");

  const form = useForm<UploadXlsxValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      name: "",
      userId: user,
      sruliPasebisjami: "",
      sruliPasebisMinusJami: "",
      wonisPasebisJami: "",
      servisisPasebisJami: "",


    },
  });
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    setUrl(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  const onSubmit = async (data: UploadXlsxValues) => {
    data.url = url;
    data.userId = user;
    try {
      const response = await axios.post(`/api/invoices`, data);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      toast.success("xlsx atvirtulia");
    }
  };
  return (
    <div className="bg-gray-200 p-8 rounded-sm">
      <div className="w-full gap-4">
        <h2 className="flex justify-center items-center">ინვოისის ატვირთვა</h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full flex flex-col"
        >
          <div className="w-full md:w-1/2 self-center">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="relative mb-3">
                  <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    ინვოისის სახელი
                  </FormLabel>
                  <FormControl className="relative rounded-md shadow-sm">
                    <Input
                      placeholder="სახელი"
                      {...field}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sruliPasebisMinusJami"
              render={({ field }) => (
                <FormItem className="relative mb-3">
                  <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    სრული ფასებს მინუს ჯამი
                  </FormLabel>
                  <FormControl className="relative rounded-md shadow-sm">
                    <Input
                      placeholder="სახელი"
                      {...field}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sruliPasebisjami"
              render={({ field }) => (
                <FormItem className="relative mb-3">
                  <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    სრული ფასების ჯამი
                  </FormLabel>
                  <FormControl className="relative rounded-md shadow-sm">
                    <Input
                      placeholder="სახელი"
                      {...field}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="wonisPasebisJami"
              render={({ field }) => (
                <FormItem className="relative mb-3">
                  <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    წონის ფასების ჯამი
                  </FormLabel>
                  <FormControl className="relative rounded-md shadow-sm">
                    <Input
                      placeholder="სახელი"
                      {...field}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="servisisPasebisJami"
              render={({ field }) => (
                <FormItem className="relative mb-3">
                  <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    სერვისის ფასების ჯამი
                  </FormLabel>
                  <FormControl className="relative rounded-md shadow-sm">
                    <Input
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
          <CldUploadWidget onUpload={onUpload} uploadPreset="setazgik">
            {({ open }) => {
              const onClick = () => {
                open();
              };
              return (
                <Button
                  className="w-full"
                  type="button"
                  variant="secondary"
                  onClick={onClick}
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  ატვირთე ინვოისი
                </Button>
              );
            }}
          </CldUploadWidget>
          <Button className="flex justify-center w-full bg-red-400 items-center self-center" type="submit">
            ატვირთვა
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ImageUpload;
