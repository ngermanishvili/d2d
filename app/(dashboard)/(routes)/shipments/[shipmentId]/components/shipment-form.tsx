"use client";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { Shipment } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import QRCodeGenerator from "@/components/ui/qr-code";
import useCalculatorStore from "@/hooks/calculate-price";

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
import ShippingCostGraph from "../../components/calculate";
import { ShipmentFormDelivered } from "./shipment-form-2";

const formSchema = z.object({
  name: z.string().min(1),
  lastName: z.string().min(1),
  city: z.string().min(1),
  address: z.string().min(1),
  phoneNumber: z.string().min(5),
  price: z.string().min(1),
  brittle: z.boolean().default(false),
  markedByCourier: z.boolean().default(false),
  mimgebisName: z.string().min(1),
  mimgebisLastname: z.string().min(1),
  mimgebisNumber: z.string().min(5),
  mimgebisAddress: z.string().min(1),
  mimgebiQalaqi: z.string().min(1),

});

// This ShipmentFormValues is for the formik form values type definition.
type ShipmentFormValues = z.infer<typeof formSchema>;

interface ShipmentFormProps {
  initialData: Shipment | null;
}

export const ShipmentForm: React.FC<ShipmentFormProps> = ({ initialData }) => {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit Shipment" : "Create Shipment";
  const description = initialData ? "Edit a Shipment" : "Add a new Shipment";
  const toastMessage = initialData ? "Shipment updated." : "Shipment created";
  const action = initialData ? "Save changes" : "Create";
  const { calculatedPrice } = useCalculatorStore();
  const form = useForm<ShipmentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      lastName: "",
      city: "",
      address: "",
      phoneNumber: "",
      price: "0",
      mimgebisName: "",
      mimgebisLastname: "",
      mimgebisNumber: "",
      mimgebisAddress: "",
      mimgebiQalaqi: "",
      brittle: false,
      markedByCourier: false,
    },
  });

  const onSubmit = async (data: ShipmentFormValues) => {
    try {
      data.price = calculatedPrice;
      setLoading(true);
      console.log("Submitted Data:", data);

      if (initialData) {
        await axios.patch(`/api/shipments/${params.shipmentId}`, data);
      } else {
        await axios.post(`/api/shipments`, data);
      }

      router.refresh();
      router.push(`/shipments`);
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
      await axios.delete(`/api/shipments/${params.shipmentId}}`);
      router.refresh();
      router.push(`/shipments`);
      toast.success("Category deleted.");
    } catch (error) {
      toast.error(
        "Make sure you removed all products using this category first."
      );
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
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />

      {/* // formik form */}
      <h2 className="bg-blue-400 text-white rounded-md w-full flex items-center justify-center p-4">გამგზავნი</h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>სახელი</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="სახელი" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="brittle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>მსხვრევადი</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value ? "Yes" : "No"}
                      onValueChange={(newValueBrittle) => {
                        console.log("New Value:", newValueBrittle); // Debug log
                        const isBrittle = newValueBrittle === "Yes";
                        console.log("isBrittlee:", isBrittle); // Debug log
                        field.onChange(isBrittle);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue>{field.value ? "Yes" : "No"}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="markedByCourier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marked by Courier</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value ? "Yes" : "No"}
                      onValueChange={(newValue) => {
                        console.log("New Value:", newValue); // Debug log
                        const isMarkedByCourier = newValue === "Yes";
                        console.log("isMarkedByCourier:", isMarkedByCourier); // Debug log
                        field.onChange(isMarkedByCourier);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue>{field.value ? "Yes" : "No"}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              key={initialData?.id}
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>გვარი</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="გვარი " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>მისამართი</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="მისამართი  "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ქალაქი</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="ქალაქი "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ტელეფონის ნომერი</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="ტელეფონის ნომერი "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <h2 className="bg-red-400 text-white rounded-md w-full flex items-center justify-center p-4">მიმღები</h2>

          <FormField
            control={form.control}
            name="mimgebisName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>სახელი</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="სახელი "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mimgebisLastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>გვარი</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="გვარი "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="mimgebisAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>მისამართი</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="მისამართი "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mimgebiQalaqi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>mimgebiQalaqi</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="mimgebiQalaqi "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mimgebisNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ტელეფონის ნომერი</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={loading}
                    placeholder="ტელეფონის ნომერი "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <ShipmentFormDelivered initialData={initialData} /> */}
          <ShippingCostGraph />

          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>

          <Card>
            <CardHeader>
              <CardTitle>დაასკანერე QR</CardTitle>
              <CardDescription>
                ყველა შეკვეთას გააჩნია უნიკალური QR{" "}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <QRCodeGenerator
                text={`${process.env.NEXT_PUBLIC_APP_URL}/shipments/${params.shipmentId}`}
              />
            </CardContent>
          </Card>
        </form>
      </Form>
    </>
  );
};