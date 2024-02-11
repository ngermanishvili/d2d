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
import { CreateModal } from "@/components/modals/shipment-create-modal";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ShippingCostGraph from "../../components/calculate";
import { RoleGate } from "@/components/auth/role-gate";
import AdressInput from "./adress";
import useAddressStore from "@/hooks/adress-store";
import Image from "next/image";
import Logo from "@/assets/images/d2d.jpg";
import { Alert, Divider } from "antd";

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

export const ShipmentForm2: React.FC<ShipmentFormProps> = ({ initialData }) => {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { address, setAddress } = useAddressStore();
  const title = initialData ? "შეცვალე შეკვეთა" : "შეკვეთის განთავსება";
  const description = initialData
    ? "შეცვალე შეკვეთა"
    : "ახალი შეკვეთის დამატება";
  const toastMessage = initialData
    ? "შეკვეთა წარმატებით შეიცვალა"
    : "შეკვეთა წარმატებით დაემატა";
  const action = initialData ? "ცვლილების შენახვა" : "შეკვეთის დამატება";

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
      deliveryDate.getDate() + 1 + (deliveryDate.getDay() === 0 ? 1 : 0)
    );

    return { pickupDate, deliveryDate };
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "numeric",
    });
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
    console.log(address);
    data.address = address;
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

      <>
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-200 border-0">
          <div className="rounded-t bg-red-500 mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <Image
                width={100}
                height={50}
                src={Logo}
                alt="logo"
                className="rounded-md"
              />
              <h2 className="text-white">D2D GEORGIA</h2>
            </div>
          </div>

          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-full flex flex-col max-h-full"
              >
                <div className="w-full flex flex-col sm:flex-row">
                  <div className=" w-5/7 sm:w-1/2 flex flex-col self-center sm:self-auto ">
                    <h6 className="text-blueGray-400 text-sm ml-4 mt-6 mb-4 font-bold uppercase">
                      გამგზავნის მონაცემები
                    </h6>
                    <div className="flex flex-wrap">
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem className="relative w-full mb-3">
                                <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                  სახელი
                                </FormLabel>
                                <FormControl className="relative rounded-md shadow-sm">
                                  <Input
                                    disabled={loading}
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
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem className="relative w-full mb-3">
                                <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                  გვარი
                                </FormLabel>
                                <FormControl className="relative rounded-md shadow-sm">
                                  <Input
                                    disabled={loading}
                                    placeholder="გვარი"
                                    {...field}
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                              <>
                                <FormItem className="relative w-full mb-3">
                                  <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold">
                                    მისამართი
                                  </FormLabel>
                                  <FormControl className="relative rounded-md shadow-sm w-full">
                                    <AdressInput />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              </>
                            )}
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                              <FormItem className="relative w-full mb-3">
                                <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                  ტელეფონის ნომერი
                                </FormLabel>
                                <FormControl className="relative rounded-md shadow-sm">
                                  <Input
                                    disabled={loading}
                                    placeholder="ტელეფონის ნომერი"
                                    {...field}
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4 relative mb-3">
                        {/* <FormField
                                            control={form.control}
                                            name="city"
                                            render={({ field }) => (
                                                <FormItem className="relative w-full mb-3">
                                                    <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                    >ქალაქი</FormLabel>
                                                    <FormControl className="relative rounded-md shadow-sm">
                                                        <Input disabled={loading} placeholder="ქალაქი" {...field} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        /> */}
                      </div>
                    </div>
                  </div>
                  <Divider type="vertical" className="h-auto bg-slate-300" />
                  <div className=" w-5/7 sm:w-1/2 flex flex-col self-center sm:self-auto ">
                    <h6 className="text-blueGray-400 text-sm ml-4 mt-6 font-bold mb-4 uppercase">
                      მიმღების მონაცემები
                    </h6>
                    <div className="flex flex-wrap">
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <FormField
                            control={form.control}
                            name="mimgebisName"
                            render={({ field }) => (
                              <FormItem className="relative w-full mb-3">
                                <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                  სახელი
                                </FormLabel>
                                <FormControl className="relative rounded-md shadow-sm">
                                  <Input
                                    disabled={loading}
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
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <FormField
                            control={form.control}
                            name="mimgebisLastname"
                            render={({ field }) => (
                              <FormItem className="relative w-full mb-3">
                                <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                  გვარი
                                </FormLabel>
                                <FormControl className="relative rounded-md shadow-sm">
                                  <Input
                                    disabled={loading}
                                    placeholder="გვარი"
                                    {...field}
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <FormField
                            control={form.control}
                            name="mimgebisAddress"
                            render={({ field }) => (
                              <FormItem className="relative w-full mb-3">
                                <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                  მისამართი
                                </FormLabel>
                                <FormControl className="relative rounded-md shadow-sm">
                                  <Input
                                    disabled={loading}
                                    placeholder="მისამართი"
                                    {...field}
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <FormField
                            control={form.control}
                            name="mimgebisNumber"
                            render={({ field }) => (
                              <FormItem className="relative w-full mb-3">
                                <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                  ტელეფონის ნომერი
                                </FormLabel>
                                <FormControl className="relative rounded-md shadow-sm">
                                  <Input
                                    disabled={loading}
                                    placeholder="ტელეფონის ნომერი"
                                    {...field}
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4 relative mb-3">
                        <FormField
                          control={form.control}
                          name="mimgebiQalaqi"
                          render={({ field }) => (
                            <FormItem className="relative w-full mb-3">
                              <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                ქალაქი
                              </FormLabel>
                              <FormControl className="relative rounded-md shadow-sm">
                                <Input
                                  disabled={loading}
                                  placeholder="ქალაქი"
                                  {...field}
                                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap">
                      <div className="w-full lg:w-4/12 px-4">
                        <div className="relative w-full mb-3">
                          <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                              <FormItem className="relative w-full mb-3">
                                <FormLabel className=" block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                  სტატუსი
                                </FormLabel>
                                <FormControl className="relative rounded-md shadow-sm">
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
                                        <SelectItem value="მიმდინარე">
                                          მიმდინარე
                                        </SelectItem>
                                        <SelectItem value="ჩაბარებული">
                                          ჩაბარებული
                                        </SelectItem>
                                        <SelectItem value="უარი ჩაბარებაზე">
                                          უარი ჩაბარებაზე
                                        </SelectItem>
                                        <SelectItem value="არ არის მისამართზე">
                                          არ არის მისამართზე
                                        </SelectItem>
                                        <SelectItem value="არ იღებს ყურმილს ">
                                          არ იღებს ყურმილს{" "}
                                        </SelectItem>
                                        <SelectItem value="აღებული">
                                          აღებული{" "}
                                        </SelectItem>
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
                                        <SelectItem value="ასაღები">
                                          ასაღები{" "}
                                        </SelectItem>
                                        <SelectItem value="საწყობში">
                                          საწყობში
                                        </SelectItem>
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
                                        <SelectItem value="მიმდინარე">
                                          მიმდინარე
                                        </SelectItem>
                                        <SelectItem value="ჩაბარებული">
                                          ჩაბარებული
                                        </SelectItem>
                                        <SelectItem value="უარი ჩაბარებაზე">
                                          უარი ჩაბარებაზე
                                        </SelectItem>
                                        <SelectItem value="არ არის მისამართზე">
                                          არ არის მისამართზე
                                        </SelectItem>
                                        <SelectItem value="არ იღებს ყურმილს ">
                                          არ იღებს ყურმილს{" "}
                                        </SelectItem>
                                        <SelectItem value="აღებული">
                                          აღებული{" "}
                                        </SelectItem>
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
                        </div>
                      </div>
                      <div className="w-full lg:w-4/12 px-4">
                        <div className="relative w-full mb-3">
                          <FormField
                            control={form.control}
                            name="markedByCourier"
                            render={({ field }) => (
                              <FormItem className="relative w-full mb-3">
                                <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                  საწყობშია ნივთი?
                                </FormLabel>
                                <FormControl>
                                  <Select
                                    value={field.value ? "Yes" : "No"}
                                    onValueChange={(newValue) => {
                                      const isMarkedByCourier =
                                        newValue === "Yes";
                                      field.onChange(isMarkedByCourier);
                                    }}
                                  >
                                    <SelectTrigger>
                                      <SelectValue>
                                        {field.value ? "Yes" : "No"}
                                      </SelectValue>
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
                        </div>
                      </div>
                      <div className="w-full lg:w-4/12 px-4">
                        <div className="relative w-full mb-3">
                          <FormField
                            control={form.control}
                            name="courierComment"
                            render={({ field }) => (
                              <FormItem className="relative w-full mb-3">
                                <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                  კომენტარი
                                </FormLabel>
                                <FormControl className="relative rounded-md shadow-sm">
                                  <Input
                                    disabled={loading}
                                    placeholder="დაწერე კომენტარი.."
                                    {...field}
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <ShippingCostGraph
                  hasInitialData={initialData ? true : false}
                />
                <CreateModal
                  agebis={agebis ? agebis : undefined}
                  chabarebis={chabareba ? chabareba : undefined}
                  loading={loading}
                  onConfirm={async () => {
                    await onSubmit(form.getValues());
                    router.push("/shipments");
                    router.refresh();
                  }}
                  isOpen={isConfirmOpen}
                  onClose={() => setIsConfirmOpen(false)}
                />

                <Button
                  type="button"
                  disabled={loading}
                  className="ml-auto self-end"
                  onClick={() => setIsConfirmOpen(true)}
                >
                  დადასტურება
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </>
    </>
  );
};
