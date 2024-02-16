"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { LandingPageInfo } from "@prisma/client";
import { TrashIcon } from "@radix-ui/react-icons";
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
import ImageUpload from "@/components/ui/image-upload";

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.string().min(1),
  panjara1Title: z.string().min(1),
  panjara1Description: z.string().min(1),
  panjara2Title: z.string().min(1),
  panjara2Description: z.string().min(1),
  panjara3Title: z.string().min(1),
  panjara3Description: z.string().min(1),
  InformationText: z.string().min(1),

});

// This BlogPostFormValues is for the formik form values type definition.
type BlogPostFormValues = z.infer<typeof formSchema>;

interface BlogPostFormProps {
  initialData: LandingPageInfo | null;
}

export const BlogPostForm: React.FC<BlogPostFormProps> = ({ initialData }) => {
  const router = useRouter();
  const params = useParams();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "ჩეცვალე ბლოგ პოსტი" : "შექმენი ბლოგ პოსტი";
  const description = initialData ? "შეცვალე ბლოგ-პოსტი" : "დაამატე ახალი ბლოგ-პოსტი";
  const toastMessage = initialData ? "ბლოგ-პოსტი შეცვლილია" : "ბლოგ-პოსტი შეიქმნა წარმატებით";
  const action = initialData ? "შენახვა" : "შექმნა";

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      imageUrl: "",
      panjara1Title: "",
      panjara1Description: "",
      panjara2Title: "",
      panjara2Description: "",
      panjara3Title: "",
      panjara3Description: "",
      InformationText: "",
    },
  });


  const onSubmit = async (data: BlogPostFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/landinginfo/${params?.landingId}`, data);
      } else {
        await axios.post(`/api/landinginfo`, data);
      }
      router.refresh();
      router.push(`/addlandinginfo`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/landinginfo/${params?.landingId}`);
      router.refresh();
      router.push(`/addlanginginfo`);
      toast.success("Blog post deleted.");
    } catch (error) {
      toast.error("Error deleting the blog post.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => {
              setOpen(true);
            }}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      {/* // formik form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-center items-center font-semibold "> ბლოგის ფოტოს ატვირთვა</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">ქვემოთა ბლოკის (ფოტო და აღწერა სადაც არის) - სათაური</FormLabel>
                <FormControl>
                  <Input
                    className="border-green-800"
                    disabled={loading}
                    placeholder="ბლოგ პოსტის სათაური"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          {/* Add the excerpt field to the form */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">ქვემოთა ბლოკის (ფოტო და აღწერა სადაც არის) - აღწერა</FormLabel>
                <FormControl>
                  <Input
                    className="border-purple-500 h-[100px]"
                    disabled={loading}
                    placeholder="Blog Post აღწერა"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="panjara1Title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">პირველი ბლოკის სათაური</FormLabel>
                <FormControl>
                  <Input
                    className="border-green-800"
                    disabled={loading}
                    placeholder="პანჯარა 1 სათაური"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}

          />

          <FormField
            control={form.control}
            name="panjara1Description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">პირველი ბლოკის აღწერა</FormLabel>
                <FormControl>
                  <Input
                    className="border-purple-500 h-[100px]"
                    disabled={loading}
                    placeholder="პანჯარა 1 აღწერა"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="panjara2Title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">მე-2 ბლოკის სათაური</FormLabel>
                <FormControl>
                  <Input
                    className="border-green-800"
                    disabled={loading}
                    placeholder="პანჯარა 2 სათაური"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="panjara2Description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">მე-2 ბლოკის აღწერა</FormLabel>
                <FormControl>
                  <Input
                    className="border-purple-500 h-[100px]"
                    disabled={loading}
                    placeholder="პანჯარა 2 აღწერა"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="panjara3Title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">მე-3 ბლოკის სათაური</FormLabel>
                <FormControl>
                  <Input
                    className="border-green-800"
                    disabled={loading}
                    placeholder="პანჯარა 3 სათაური"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}

          />

          <FormField
            control={form.control}
            name="panjara3Description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">მე-3 ბლოკის აღწერა</FormLabel>
                <FormControl>
                  <Input
                    className="border-purple-500 h-[100px]"
                    disabled={loading}
                    placeholder="პანჯარა 3 აღწერა"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}

          />

          <FormField
            control={form.control}
            name="InformationText"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">მთავარი ინფორმაცია რომელიც D2D GEORGIA-ს დაბლა ჩანს.</FormLabel>
                <FormControl>
                  <Input
                    className="border-purple-500 h-[100px]"
                    disabled={loading}
                    placeholder="მთავარი ინფორმაცია"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
