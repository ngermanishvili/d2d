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

  const title = initialData ? "Edit Blog Post" : "Create Blog Post";
  const description = initialData ? "Edit a blog post" : "Add a new blog post";
  const toastMessage = initialData ? "Blog post updated." : "Blog post created";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      content: "",
      imageUrl: "",
      excerpt: "",
      slug: "",
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
                <FormLabel>Featured Image</FormLabel>
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
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Blog Post Title"
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
                <FormLabel>slug</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="slug"
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
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <textarea
                    disabled={loading}
                    placeholder="Blog Post Content"
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
                <FormLabel>Excerpt</FormLabel>
                <FormControl>
                  <textarea
                    disabled={loading}
                    placeholder="Blog Post Excerpt"
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
