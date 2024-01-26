"use client";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
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
import { RoleGate } from "@/components/auth/role-gate";
import { format } from "date-fns";
import { parse, addDays, isSunday } from "date-fns";

const formSchema = z.object({
  name: z.string().min(1),
  lastName: z.string().min(1),
  city: z.string().min(1),
  whopays: z.string().min(1),
  address: z.string().min(1),
  phoneNumber: z.string().min(5),
  price: z.string().min(1),
  brittle: z.boolean().default(false),
  packaging: z.boolean().default(false),
  markedByCourier: z.boolean().default(false),
  mimgebisName: z.string().min(1),
  mimgebisLastname: z.string().min(1),
  mimgebisNumber: z.string().min(5),
  mimgebisAddress: z.string().min(1),
  mimgebiQalaqi: z.string().min(1),
  status: z.string().min(1),
  courierComment: z.string().min(1),
  label: z.string().min(1),
  agebisDro: z.string().nullable().optional(),
  itemPrice: z.string().nullable().optional(),
  chabarebisDro: z.string().nullable().optional(),
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

  const {
    shipmentCost,
    setShipmentCost,
    packagingUsed,
    setPackagingUsed,
    selectedCity,
    range,
    setRange,
    setCity,
    selectedParty,
    setSelectedParty,
    itemPrice,
    setItemPrice,
    totalPrice,
    setTotalPrice,
  } = useCalculatorStore();

  const form = useForm<ShipmentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      lastName: "",
      city: selectedCity,
      address: "",
      phoneNumber: "",
      price: "0",
      itemPrice: null,
      mimgebisName: "",
      mimgebisLastname: "",
      mimgebisNumber: "",
      mimgebisAddress: "",
      mimgebiQalaqi: "",
      brittle: false,
      packaging: false,
      markedByCourier: false,
      status: "მიმდინარე",
      courierComment: "",
      label: "0-5 kg",
      whopays: "sender",
      agebisDro: "",
      chabarebisDro: "",
    },
  });

  const calculateDates = (): { pickupDate: Date; deliveryDate: Date } => {
    const currentDateTime = new Date();
    const isBefore3PM = currentDateTime.getHours() < 15; // Check if current time is before 4 PM

    const pickupDate = new Date(currentDateTime);
    if (!isBefore3PM) {
      // Current time is after 4 PM, set pickup date to the next day
      pickupDate.setDate(pickupDate.getDate() + 1);
    }

    // Check if the next day is Sunday
    if (pickupDate.getDay() === 0) {
      // If Sunday, set pickup date to Monday
      pickupDate.setDate(pickupDate.getDate() + 1);
    }

    // Calculate delivery date as pickup date + 2 days (excluding Sundays)
    const deliveryDate = new Date(pickupDate);
    deliveryDate.setDate(
      deliveryDate.getDate() + 2 + (deliveryDate.getDay() === 0 ? 1 : 0)
    );

    return { pickupDate, deliveryDate };
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", { day: "numeric", month: "numeric" });
  };
  function formatDateInGeorgian(pickupDate: string): string {
    // Split the date into parts
    const parts: string[] = pickupDate.split("/");

    // Map the month number to the Georgian month name
    const georgianMonths: string[] = [
      "იანვარი",
      "თებერვალი",
      "მარტი",
      "აპრილი",
      "მაისი",
      "ივნისი",
      "ივლისი",
      "აგვისტო",
      "სექტემბერი",
      "ოქტომბერი",
      "ნოემბერი",
      "დეკემბერი",
    ];

    // Get the Georgian month name
    const georgianMonth: string = georgianMonths[parseInt(parts[0], 10) - 1];

    // Format the date as "DD იანვარი"
    const formattedDate: string = `${parts[1]} ${georgianMonth}`;

    return formattedDate;
  }
  const { pickupDate, deliveryDate } = calculateDates();
  const agebis = formatDateInGeorgian(formatDate(pickupDate));
  const chabareba = formatDateInGeorgian(formatDate(deliveryDate));
  const onSubmit = async (data: ShipmentFormValues) => {
    //  const aris = aq iqneba check
    try {
      data.packaging = packagingUsed;
      data.label = range;
      data.city = selectedCity;
      data.whopays = selectedParty;
      data.price = totalPrice.toString();
      if (selectedParty === "Receiver") data.itemPrice = itemPrice.toString();
      setLoading(true);
      console.log(data);

      if (!initialData) {
        // Calculate pickup and delivery dates using current date and time
        data.agebisDro = agebis;
        data.chabarebisDro = chabareba;

        // Execute the post request
        await axios.post(`/api/shipments`, data);
      }

      if (initialData) {
        await axios.patch(`/api/shipments/${params.shipmentId}`, data);
      }

      router.refresh();
      router.push(`/shipments`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      router.refresh();
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
  useEffect(() => {
    // Check if initialData is true
    if (initialData) {
      setCity((initialData.city as "Tbilisi") || "Rustavi");
      setRange(initialData.label);
      setPackagingUsed(initialData.packaging);
      setSelectedParty((initialData.whopays as "Sender") || "Receiver");
      if (initialData.itemPrice !== null) {
        setItemPrice(parseFloat(initialData.itemPrice));
      }
    }
  }, []); // Dependency array ensures that the effect runs when initialData changes

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
      <h2 className="bg-blue-400 text-white rounded-md w-full flex items-center justify-center p-4">
        გამგზავნი
      </h2>
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
              name="courierComment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>კომენტარი</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="კომენტარი"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>სტატუსი</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(newValue) => {
                        field.onChange(newValue);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue>{field.value}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {/* {ADMIN როლგეითი} */}
                        <RoleGate allowedRole="ADMIN">
                          <SelectItem value="მიმდინარე">მიმდინარე</SelectItem>
                          <SelectItem value="ჩაბარებული">ჩაბარებული</SelectItem>
                          <SelectItem value="უარი ჩაბარებაზე">
                            უარი ჩაბარებაზე
                          </SelectItem>
                          <SelectItem value="არ არის მისამართზე">
                            არ არის მისამართზე
                          </SelectItem>
                          <SelectItem value="არ იღებს ყურმილს ">
                            არ იღებს ყურმილს{" "}
                          </SelectItem>
                          <SelectItem value="აღებული">აღებული </SelectItem>
                          <SelectItem value="ვერ ხდება დაკავშირება">
                            ვერ ხდება დაკავშირება
                          </SelectItem>
                          <SelectItem value="მეორედ გატანა">
                            მეორედ გატანა
                          </SelectItem>
                          <SelectItem value="უბრუნდება გამგზავნს">
                            უბრუნდება გამგზავნს
                          </SelectItem>
                          <SelectItem value="გაუქმებულია გამგზავნის მიერ ">
                            გაუქმებულია გამგზავნის მიერ{" "}
                          </SelectItem>
                          <SelectItem value="ასაღები">ასაღები </SelectItem>
                          <SelectItem value="საწყობში">საწყობში</SelectItem>
                          <SelectItem value="ფილიალიდან გაცემა ">
                            ფილიალიდან გაცემა{" "}
                          </SelectItem>
                          <SelectItem value="გატანილი ჩასაბარებლად">
                            გატანილი ჩასაბარებლად{" "}
                          </SelectItem>
                          <SelectItem value="დაუბრუნდა გამგზავნს, დასრულება">
                            დაუბრუნდა გამგზავნს, დასრულება
                          </SelectItem>
                          <SelectItem value="ვერ მოხერხდა დაკავშირება">
                            ვერ მოხერხდა დაკავშირება{" "}
                          </SelectItem>
                        </RoleGate>
                        {/* {USER როლგეითი} */}
                        <RoleGate allowedRole="USER">
                          <SelectItem value="მიმდინარე">მიმდინარე</SelectItem>
                          <SelectItem value="ჩაბარებული">ჩაბარებული</SelectItem>
                          <SelectItem value="უარი ჩაბარებაზე">
                            უარი ჩაბარებაზე
                          </SelectItem>
                          <SelectItem value="არ არის მისამართზე">
                            არ არის მისამართზე
                          </SelectItem>
                          <SelectItem value="არ იღებს ყურმილს ">
                            არ იღებს ყურმილს{" "}
                          </SelectItem>
                          <SelectItem value="აღებული">აღებული </SelectItem>
                          <SelectItem value="ვერ ხდება დაკავშირება">
                            ვერ ხდება დაკავშირება
                          </SelectItem>
                        </RoleGate>
                      </SelectContent>
                    </Select>
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
                        const isBrittle = newValueBrittle === "Yes";
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
                        const isMarkedByCourier = newValue === "Yes";
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

          <h2 className="bg-red-400 text-white rounded-md w-full flex items-center justify-center p-4">
            მიმღები
          </h2>

          <FormField
            control={form.control}
            name="mimgebisName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>სახელი</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="სახელი " {...field} />
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
                  <Input disabled={loading} placeholder="გვარი " {...field} />
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
          <ShippingCostGraph hasInitialData={initialData ? true : false} />

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
