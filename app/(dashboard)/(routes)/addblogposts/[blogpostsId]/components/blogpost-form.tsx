"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { BlogPosts } from "@prisma/client";
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
  content: z.string().min(1),
  imageUrl: z.string().min(1),
  excerpt: z.string(),
  slug: z.string(),
  qvesatauri: z.string(),
  qvesatauri2: z.string(),

});

// This BlogPostFormValues is for the formik form values type definition.
type BlogPostFormValues = z.infer<typeof formSchema>;

interface BlogPostFormProps {
  initialData: BlogPosts | null;
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
      content: "",
      imageUrl: "",
      excerpt: "",
      slug: "",
      qvesatauri: "",
      qvesatauri2: "",
    },
  });


  const onSubmit = async (data: BlogPostFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/blogposts/${params?.blogpostsId}`, data);
      } else {
        await axios.post(`/api/blogposts`, data);
      }
      router.refresh();
      router.push(`/addblogposts`);
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
      await axios.delete(`/api/blogposts/${params?.blogpostId}`);
      router.refresh();
      router.push(`/addblogposts`);
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
                <FormLabel>სათაური</FormLabel>
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
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ფოტოს და სათაურის შემდეგ მოდის პატარა აღწერა სანამ სრულად ნახავს მომხმარებელი</FormLabel>
                <FormControl>
                  <Input
                    className="border-purple-500"
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
            name="qvesatauri"
            render={({ field }) => (
              <FormItem>
                <FormLabel>არტიკლის სათაური</FormLabel>
                <FormControl>
                  <Input
                    className="border-orange-500"
                    disabled={loading}
                    placeholder="ბლოგ პოსტ კონტენტი"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>პირველი აბზაცი</FormLabel>
                <FormControl>
                  <Input
                    className="h-[100px] border-green-500"
                    disabled={loading}
                    placeholder="ბლოგ პოსტ კონტენტი"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="qvesatauri2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ქვესათაური მეორე აბზაცისთვის</FormLabel>
                <FormControl>
                  <Input
                    className="border-orange-500"
                    disabled={loading}
                    placeholder="ქვესათაური მეორე აბზაცისთვის"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>მეორე აბზაცი</FormLabel>
                <FormControl>
                  <Input
                    className="h-[100px] border-green-500"
                    disabled={loading}
                    placeholder="მეორე აბზაცი"
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
