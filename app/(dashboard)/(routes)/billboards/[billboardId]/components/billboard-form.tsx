"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { Billboard } from "@prisma/client";
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
import ShippingCostGraph from "../../../shipments/components/calculate";

const formSchema = z.object({
  label: z.string(),
  imageUrl: z.string().min(1),
});

// This BillBoardFormValues is for the formik form values type definition.
type BillBoardFormValues = z.infer<typeof formSchema>;

interface BillBoardFormProps {
  initialData: Billboard | null;
}

export const BillBoardForm: React.FC<BillBoardFormProps> = ({
  initialData,
}) => {
  const router = useRouter();
  const params = useParams();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "ბილბორდის შეცვლა" : "ბილბორდის დამატება";
  const description = initialData
    ? "შეცვალე ბილბორდი"
    : "დაამატე ახალი ბილბორდი";
  const toastMessage = initialData
    ? "ბილბორდი წარმატებით შეიცვალა"
    : "ბილბორდი წარმატებით შეიქმნა";
  const action = initialData ? "შენახვა" : "შექმნა";

  const form = useForm<BillBoardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: BillBoardFormValues) => {
    try {
      setLoading(true);
      data.label = "ქავერის ფოტო";
      if (initialData) {
        await axios.patch(`/api/billboards/${params?.billboardId}`, data);
      } else {
        await axios.post(`/api/billboards`, data);
      }
      router.refresh();
      router.push(`/billboards`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("დაფიქსირდა შეცდომა");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/billboards/${params?.billboardId}}`);
      router.refresh();
      router.push(`/billboards`);
      toast.success("ბილბორდი წაიშალა");
    } catch (error) {
      toast.error("დაფიქსირდა შეცდომა");
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
                <FormLabel>ქავერის ფოტო</FormLabel>
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
          <div className="hidden ">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ტექსტი</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billboard Label"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <ShippingCostGraph /> */}
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
