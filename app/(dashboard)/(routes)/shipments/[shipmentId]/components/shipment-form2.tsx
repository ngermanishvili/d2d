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
import { ConfirmModal } from "@/components/modals/shipment-confirmed-modal";

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
// import AdressInputClient from "./adress-client";
import useAddressStore from "@/hooks/adress-store";
import Image from "next/image";
import Logo from "@/assets/images/d2d.jpg";
import { Alert, Divider } from "antd";
import { FaUserTag, FaPhoneVolume, FaAddressCard } from "react-icons/fa6";

const formSchema = z.object({
  mimgebiFullName: z.string().min(1),
  gamgzavniFullName: z.string().min(1),
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
  orderComment: z.string().min(1).optional(),
  label: z.string().min(1),
  agebisDro: z.string().nullable().optional(),
  itemPrice: z.string().nullable().optional(),
  chabarebisDro: z.string().nullable().optional(),
  gamgzavnisqalaqi: z.string().min(1),
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
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qrText, setQrText] = useState("");
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
    calculated,
    setCalculated,
  } = useCalculatorStore();

  const form = useForm<ShipmentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      mimgebiFullName: "",
      gamgzavniFullName: "",
      city: selectedCity,
      address: "",
      phoneNumber: "",
      price: "0",
      itemPrice: null,
      mimgebisNumber: "",
      mimgebisAddress: "",
      mimgebiQalaqi: "თბილისი",
      brittle: false,
      packaging: false,
      markedByCourier: false,
      status: "მიმდინარე",
      orderComment: "",
      label: "0-5 kg",
      whopays: "sender",
      agebisDro: "",
      chabarebisDro: "",
      gamgzavnisqalaqi: "თბილისი",
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
    try {
      data.packaging = packagingUsed;
      data.label = range;
      data.city = selectedCity;
      data.whopays = selectedParty;
      data.price = totalPrice.toString();
      data.itemPrice = itemPrice.toString();
      setLoading(true);
      console.log(data);
      if (!initialData) {
        // Calculate pickup and delivery dates using current date and time
        data.agebisDro = agebis;
        data.chabarebisDro = chabareba;

        // Execute the post request
        const response = await axios.post(`/api/shipments`, data);
        const shipmentId = response.data.shipmentId; // Accessing the shipmentId from the response
        console.log("Shipment created with ID:", shipmentId);
        setQrText(shipmentId);
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
      setCity((initialData.city as "თბილისი") || "რუსთავი");
      setPackagingUsed(initialData.packaging);
      setSelectedParty((initialData.whopays as "Sender") || "Receiver" || "");
      if (initialData.itemPrice !== null) {
        setItemPrice(parseFloat(initialData.itemPrice));
      }
      setRange(initialData?.label);
    }
    setCalculated(true);
  }, [selectedCity]); // Dependency array ensures that the effect runs when initialData changes

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
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg  border-0">
          {/* <div className="rounded-t bg-red-500 mb-0 px-6 py-6">
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
          </div> */}

          <div className="flex-auto min[410px]:px-4 lg:px-10 py-10 pt-0">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-full flex flex-col max-h-full"
              >
                <div className="w-full flex flex-col md:flex-row">
                  <div className="md:w-1/2 w-4/5 self-center max-[410px]:w-full md:self-auto bg-slate-200 rounded-2xl mt-2">
                    <h2 className="text-blueGray-400 text-lg ml-4 mt-6 font-bold uppercase ">
                      გამგზავნის მონაცემები
                    </h2>
                    <div className="flex justify-end flex-wrap mt-8">
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <FormField
                            control={form.control}
                            name="gamgzavniFullName"
                            render={({ field }) => (
                              <FormItem className="relative w-full mb-3">
                                <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                  გამგზავნის სახელი / გვარი
                                </FormLabel>
                                <FormControl className="relative rounded-md shadow-sm">
                                  <div className="relative">
                                    <Input
                                      disabled={loading}
                                      placeholder="სახელი"
                                      {...field}
                                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring max-w-full  h-[50px] ease-linear transition-all duration-150 outline-0"
                                    />
                                    <FaUserTag className="absolute top-[17px] right-[10px] w-5 h-5" />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <FormField
                          control={form.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem className="relative w-full mb-3">
                              <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                ტელეფონის ნომერი
                              </FormLabel>
                              <FormControl className="relative rounded-md shadow-sm">
                                <div className="relative">
                                  <Input
                                    disabled={loading}
                                    placeholder="ტელეფონის ნომერი"
                                    {...field}
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-[50px]"
                                  />
                                  <FaPhoneVolume className="absolute top-[17px] right-[10px] w-5 h-5" />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-8">
                          <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                              <>
                                <FormItem className="relative w-full mb-3 h-[50px]">
                                  <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold ">
                                    მისამართი
                                  </FormLabel>
                                  <FormControl className="relative rounded-md shadow-sm w-full h-[50px]">
                                    <AdressInput />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              </>
                            )}
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4 relative mb-3">
                        <FormLabel className=" block uppercase text-blueGray-600 text-xs font-bold mb-2 bg-transparent">
                          ქალაქი
                        </FormLabel>
                        <FormField
                          control={form.control}
                          name="gamgzavnisqalaqi"
                          render={({ field }) => (
                            <FormItem className="relative w-full mb-3 bg-white  border-none outline-none">
                              <FormControl className="relative rounded-md shadow-sm outline-0 border-none">
                                <Select
                                  value={field.value}
                                  onValueChange={(newValue) => {
                                    field.onChange(newValue);
                                  }}
                                >
                                  <SelectTrigger className="h-[50px]">
                                    <SelectValue>{field.value}</SelectValue>
                                  </SelectTrigger>
                                  <SelectContent>
                                    {/* {ADMIN როლგეითი} */}
                                    <SelectItem value="თბილისი">
                                      თბილისი
                                    </SelectItem>
                                    <SelectItem value="რუსთავი">
                                      რუსთავი
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="w-full lg:w-6/12 px-4 relative mb-3">
                        <FormField
                          control={form.control}
                          name="orderComment"
                          render={({ field }) => (
                            <FormItem className="relative w-full mb-3">
                              <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                კომენტარი
                              </FormLabel>
                              <FormControl className="relative rounded-md shadow-sm h-[50px]">
                                <Input
                                  disabled={loading}
                                  placeholder="დაწერე კომენტარი.."
                                  {...field}
                                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:ring w-full ease-linear transition-all duration-150 focus:border-transparent focus:outline-none"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <Divider
                    type="vertical"
                    className="h-auto bg-transparent w-2.5 mt-4 border-none"
                  />
                  <div className="md:w-1/2 w-4/5 max-[410px]:w-full self-center md:self-auto  bg-slate-200 rounded-2xl mt-2">
                    <h6 className="text-blueGray-400 text-lg ml-4 mt-6 font-bold uppercase">
                      მიმღების მონაცემები
                    </h6>
                    <div className="flex flex-wrap mt-8">
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <FormField
                            control={form.control}
                            name="mimgebiFullName"
                            render={({ field }) => (
                              <FormItem className="relative w-full mb-3">
                                <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                  მიმღების სახელი / გვარი
                                </FormLabel>
                                <FormControl className="relative rounded-md shadow-sm">
                                  <div className="absolute">
                                    <Input
                                      disabled={loading}
                                      placeholder="სახელი"
                                      {...field}
                                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-[50px]"
                                    />
                                    <FaUserTag className="absolute top-[17px] right-[10px] w-5 h-5" />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <FormField
                          control={form.control}
                          name="mimgebisAddress"
                          render={({ field }) => (
                            <FormItem className="relative w-full mb-3">
                              <FormLabel className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                მისამართი
                              </FormLabel>
                              <FormControl className="relative rounded-md shadow-sm">
                                <div className="relative">
                                  <Input
                                    disabled={loading}
                                    placeholder="მისამართი"
                                    {...field}
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-[50px]"
                                  />
                                  <FaAddressCard className="absolute top-[17px] right-[10px] w-5 h-5" />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="w-full lg:w-6/12 px-4 relative mb-3">
                        <FormLabel className=" block uppercase text-blueGray-600 text-xs font-bold mb-2 bg-transparent">
                          ქალაქი
                        </FormLabel>
                        <FormField
                          control={form.control}
                          name="mimgebiQalaqi"
                          render={({ field }) => (
                            <FormItem className="relative w-full mb-3 bg-white  border-none outline-none">
                              <FormControl className="relative rounded-md shadow-sm outline-0 border-none">
                                <Select
                                  value={
                                    initialData?.mimgebiQalaqi || selectedCity
                                  }
                                  onValueChange={(value) => {
                                    setCity(value as "თბილისი" | "რუსთავი");
                                    field.onChange(
                                      value as "თბილისი" | "რუსთავი"
                                    );
                                  }}
                                >
                                  <SelectTrigger className="h-[50px] bg-white">
                                    <SelectValue>{field.value}</SelectValue>
                                  </SelectTrigger>
                                  <SelectContent>
                                    {/* {ADMIN როლგეითი} */}
                                    <SelectItem value="თბილისი">
                                      თბილისი
                                    </SelectItem>
                                    <SelectItem value="რუსთავი">
                                      რუსთავი
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
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
                                  <div className="relative">
                                    <Input
                                      disabled={loading}
                                      placeholder="ტელეფონის ნომერი"
                                      {...field}
                                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-[50px]"
                                    />
                                    <FaPhoneVolume className="absolute top-[17px] right-[10px] w-5 h-5" />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap">
                      <RoleGate allowedRole="ADMIN">
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
                      </RoleGate>

                      <div className="w-full lg:w-4/12 px-4"></div>
                    </div>
                  </div>
                </div>
                <ShippingCostGraph
                  hasInitialData={initialData ? true : false}
                />
                <CreateModal
                  initialData={initialData ? true : false}
                  agebis={agebis ? agebis : undefined}
                  chabarebis={chabareba ? chabareba : undefined}
                  loading={loading}
                  onConfirm={async () => {
                    await onSubmit(form.getValues());
                    if (!initialData) {
                      setIsCreateOpen(false);
                      setIsConfirmOpen(true);
                    } else {
                      setIsCreateOpen(false);
                      router.push("/shipments");
                    }
                  }}
                  isOpen={isCreateOpen}
                  onClose={() => setIsCreateOpen(false)}
                />
                <ConfirmModal
                  loading={loading}
                  text={qrText.split("-")[0]}
                  onConfirm={() => {
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
                  onClick={() => setIsCreateOpen(true)}
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
