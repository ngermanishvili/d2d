"use client";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import {useState, useEffect} from "react";
import {Shipment, UserRole} from "@prisma/client";
import {Trash} from "lucide-react";
import {useForm} from "react-hook-form";
import {useParams, useRouter} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod";
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
import {Heading} from "@/components/ui/heading";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {Input} from "@/components/ui/input";
import {AlertModal} from "@/components/modals/alert-modal";
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
import {NextURL} from "next/dist/server/web/next-url";
import {UsersColumn} from "./columns";

const formSchema = z.object({
  name: z.string().optional(),
  number: z.string().optional(),
  image: z.string().optional(),
  role: z.string().optional(),
  email: z.string().optional(),
});

type UserFormValues = z.infer<typeof formSchema>;

interface ShipmentFormProps {
  initialData: UsersColumn;
}

export const UserForm: React.FC<ShipmentFormProps> = ({initialData}) => {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // const title = initialData ? "Edit Shipment" : "Create Shipment";
  // const description = initialData ? "Edit a Shipment" : "Add a new Shipment";
  const toastMessage = initialData ? "Shipment updated." : "Shipment created";
  const action = initialData ? "Save changes" : "Create";
  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      number: "",
      email: "",
      role: "",
      image: "",
    },
  });

  const onSubmit = async (data: UserFormValues) => {
    try {
      console.log("Submitted Data:", data);

      // if (initialData) {
      //   await axios.patch(`/api/shipments/${params.shipmentId}`, data);
      // } else {
      //   await axios.post(`/api/shipments`, data);
      // }

      // router.refresh();
      // router.push(`/couriers`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
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
              name="number"
              render={({field}) => (
                <FormItem>  
                  <FormLabel>nomeri</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="სახელი" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>სახელი</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="სახელი" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="role"
              render={({field}) => (
                <FormItem>
                  <FormLabel>სტატუსი</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="აირჩიეთ თქვენი სტატუსი" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={UserRole.USER}>User</SelectItem>
                      <SelectItem value={UserRole.COURIER}>Courier</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
