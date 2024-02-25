"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { ShippingPrice } from "@prisma/client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Container from "@/components/ui/container";
const formSchema = z.object({
  id: z.string().min(1),
  city: z.string().min(1),
  weightRange: z.string().min(1),
  village: z.string().min(0),
  price: z.string().min(0),
  villagePrice: z.string().min(0),
});

type ShippingCostFormValues = z.infer<typeof formSchema>;

interface ShippingCostFormProps {
  initialData: ShippingPrice | null;
}

interface WeightRange {
  label: string;
}
const weightRanges: WeightRange[] = [
  { label: "0-5 კგ" },
  { label: "5-10 კგ" },
  { label: "10-15 კგ" },
  { label: "15-20 კგ" },
  { label: "20-25 კგ" },
];
export const ShippingCostForm: React.FC<ShippingCostFormProps> = ({
  initialData,
}) => {
  const router = useRouter();
  const params = useParams();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [weight, setWeight] = useState("0-5 კგ");
  const title = initialData ? "ჩეცვალე ბლოგ პოსტი" : "შექმენი ბლოგ პოსტი";
  const description = initialData
    ? "შეცვალე ბლოგ-პოსტი"
    : "დაამატე ახალი ბლოგ-პოსტი";
  const toastMessage = initialData
    ? "ბლოგ-პოსტი შეცვლილია"
    : "ბლოგ-პოსტი შეიქმნა წარმატებით";
  const action = initialData ? "შენახვა" : "შექმნა";

  const form = useForm<ShippingCostFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      id: "",
      city: "",
      village: "",
      weightRange: "",
      price: "",
      villagePrice: "",
    },
  });

  const onSubmit = async (data: ShippingCostFormValues) => {
    console.log(data, "Shemodis");
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/shippingcost/${params?.id}`, data);
      } else {
        await axios.post(`/api/shippingcost`, data);
      }
      router.refresh();
      router.push(`/shippingcost`);
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
  if (initialData?.villagePrice === null) {
    initialData.villagePrice = "";
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />

      <Separator />
      <Container>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">ქალაქი</FormLabel>
                  <FormControl>
                    <Input
                      className="border-green-800"
                      disabled={loading}
                      placeholder="ქალაქი"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weightRange"
              render={({ field }) => (
                <FormItem className="relative w-full mb-3 bg-white  border-none outline-none">
                  <FormControl className="relative rounded-md shadow-sm outline-0 border-none">
                    <Select
                      value={initialData?.weightRange}
                      onValueChange={(value) => {
                        setWeight(value);
                        field.onChange(value);
                      }}
                    >
                      <SelectTrigger className=" bg-white">
                        <SelectValue>{field.value}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {weightRanges.map((range) => (
                          <SelectItem key={range.label} value={range.label}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="relative w-full mb-3">
                  <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    ფასი
                  </FormLabel>
                  <FormControl className="relative rounded-md shadow-sm">
                    <div className="relative">
                      <Input
                        disabled={loading}
                        placeholder="ფასი"
                        {...field}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="village"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">სოფელი</FormLabel>
                  <FormControl>
                    <Input
                      className="border-green-800"
                      disabled={loading}
                      placeholder="სოფელი"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="villagePrice"
              render={({ field }) => (
                <FormItem className="relative w-full mb-3">
                  <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    სოფლის ფასი
                  </FormLabel>
                  <FormControl className="relative rounded-md shadow-sm">
                    <div className="relative">
                      <Input
                        disabled={loading}
                        placeholder="სოფლის ფასი"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              onClick={() => onSubmit(form.getValues())}
              disabled={loading}
              className="ml-auto"
              type="submit"
            >
              {action}
            </Button>
          </form>
        </Form>
      </Container>

      {/* // formik form */}
    </>
  );
};
