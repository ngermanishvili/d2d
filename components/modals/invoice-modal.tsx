"use client";
import { useEffect, useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { InvoiceColumn } from "@/app/(protected)/couriers/[id]/components/columns";
import { useCurrentUser } from "@/hooks/use-current-user";
import { RocketIcon } from "@radix-ui/react-icons";
import { FaPrint } from "react-icons/fa";
import StampImage from "@/assets/images/stamp-d2d.png";
import Image from "next/image";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Divider } from "antd";
import { Input } from "../ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import { FormLabel } from "../ui/form";
import Link from "next/link";
import { RoleGate } from "../auth/role-gate";
import { update } from "@/auth";

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  data: InvoiceColumn;
  onUpdate: (updatedData: InvoiceColumn) => void; // Add onUpdate prop
}
export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [updatedData, setUpdatedData] = useState(data);

  // Function to handle input changes and update the state
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    try {
      axios.patch(`/api/invoices`, updatedData);
      toast.success("ინვოისი შენახულია");
      onClose();
    } catch (error) {
      console.log("InvoiceModal", error);
    }
  };

  const user = useCurrentUser();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      title={data.name}
      description="ინვოისის დეტალები"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="overflow-y-auto max-h-[70vh] w-full">
        <Alert>
          <RocketIcon className="h-4 w-4" />
          <AlertTitle className="mt-1 w-full">
            ინვოისის გენერირების თარიღი - &nbsp;
            {new Date(data?.createdAt).toLocaleDateString("en-US", {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
            })}
          </AlertTitle>
        </Alert>

        <div className="w-full p-4">
          <Image
            src={StampImage}
            alt="stamp"
            width={100}
            height={100}
            className="absolute right-[40px] z-99 hidden print:block"
          />

          <div className="flex gap-4">
            <p className="text-md text-muted-foreground">ინვოისის ნომერი - </p>
            <p className="text-md text-muted-foreground">INV001</p>
          </div>
          <div className="bg-gray-200 w-full h-[0.2px] mt-4 rounded-sm"></div>
          <div className="flex gap-4">
            <p className="text-md text-muted-foreground">დასახელება - </p>
            <p className="text-md text-muted-foreground">{user?.name}</p>
          </div>
          <div className="bg-gray-200 w-full h-[0.2px] mt-4"></div>
          <div className="flex gap-4">
            <p className="text-md text-muted-foreground">ს / კ - </p>
            <p className="text-md text-muted-foreground">{user?.input2}</p>
          </div>
          <div className="bg-gray-200 w-full h-[0.2px] mt-4"></div>
          <div className="flex gap-4">
            <p className="text-md text-muted-foreground">ტელეფონი - </p>
            <p className="text-md text-muted-foreground">{user?.number}</p>
          </div>
          <div className="bg-gray-200 w-full h-[0.2px] mt-4"></div>
          <div className="flex gap-4">
            <p className="text-md text-muted-foreground">ელ-ფოსტა </p>
            <p className="text-md text-muted-foreground">{user?.email}</p>
          </div>
          <Divider />
          <RoleGate allowedRole="ADMIN">
            <div className="w-full border border-gray-200 p-4">
              <div className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                ინვოისის სახელი
              </div>
              <Input
                type="text"
                name="name"
                value={updatedData.name}
                onChange={handleInputChange}
              />
              <div className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                სერვისის ფასების ჯამი
              </div>
              <Input
                type="text"
                name="servisisPasebisJami"
                value={updatedData.servisisPasebisJami}
                onChange={handleInputChange}
              />
              <div className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                წონის ფასების ჯამი
              </div>
              <Input
                type="text"
                name="wonisPasebisJami"
                value={updatedData.wonisPasebisJami}
                onChange={handleInputChange}
              />
              <div className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                წონის ფასებს გამოკლებული ჯამი
              </div>
              <Input
                type="text"
                name="sruliPasebisMinusJami"
                value={updatedData.sruliPasebisMinusJami}
                onChange={handleInputChange}
              />
              <div className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                სრული ფასების ჯამი
              </div>
              <Input
                type="text"
                name="sruliPasebisjami"
                value={updatedData.sruliPasebisjami}
                onChange={handleInputChange}
              />
            </div>
          </RoleGate>
          <RoleGate allowedRole="ACCOUNTANT">
            <div className="w-full border border-gray-200 p-4">
              <div className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                ინვოისის სახელი
              </div>
              <Input
                type="text"
                name="name"
                value={updatedData.name}
                onChange={handleInputChange}
              />
              <div className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                სერვისის ფასების ჯამი
              </div>
              <Input
                type="text"
                name="servisisPasebisJami"
                value={updatedData.servisisPasebisJami}
                onChange={handleInputChange}
              />
              <div className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                წონის ფასების ჯამი
              </div>
              <Input
                type="text"
                name="wonisPasebisJami"
                value={updatedData.wonisPasebisJami}
                onChange={handleInputChange}
              />
              <div className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                წონის ფასებს გამოკლებული ჯამი
              </div>
              <Input
                type="text"
                name="sruliPasebisMinusJami"
                value={updatedData.sruliPasebisMinusJami}
                onChange={handleInputChange}
              />
              <div className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                სრული ფასების ჯამი
              </div>
              <Input
                type="text"
                name="sruliPasebisjami"
                value={updatedData.sruliPasebisjami}
                onChange={handleInputChange}
              />{" "}
              <div className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                კომპანიას ერიცხება
              </div>
              <Input
                type="text"
                name="angarishsworeba"
                value={updatedData.angarishsworeba}
                onChange={handleInputChange}
              />
            </div>
          </RoleGate>
          <RoleGate allowedRole="USER">
            <div className="w-full border border-gray-200 p-4">
              <div className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                სერვისის ფასების ჯამი
              </div>

              <div className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white   text-black font-bold rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-auto mb-2">
                <span> {updatedData.servisisPasebisJami} ₾ </span>
              </div>
              <div className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                წონის ფასების ჯამი
              </div>
              <div className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white   text-black font-bold rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-auto mb-2">
                <span> {updatedData.wonisPasebisJami} ₾ </span>
              </div>
              <div className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                წონის ფასებს გამოკლებული ჯამი
              </div>
              <div className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white   text-black font-bold rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-auto mb-2">
                <span> {updatedData.sruliPasebisMinusJami} ₾ </span>
              </div>
              <div className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                სულ
              </div>
              <div className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white   text-lime-600 font-bold rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-auto mb-2">
                <span> {updatedData.sruliPasebisjami} ₾ </span>
              </div>
            </div>
          </RoleGate>

          <div className="w-full border border-gray-200 p-4">
            <Alert>
              <RocketIcon className="h-4 w-4" />
              <AlertTitle className="mt-1">
                ანგარიშსწორება - &nbsp; {data.angarishsworeba}
              </AlertTitle>
            </Alert>
          </div>
          <Link
            className="print:hidden  flex w-full my-2 p-1 bg-red-500 text-white  items-center justify-center rounded-sm"
            href={data.url}
          >
            ინვოისის გადმოწერა
          </Link>
          <Button className="w-full print:hidden " onClick={handlePrint}>
            <FaPrint className="mr-2" />
          </Button>
        </div>
        <div className="flex justify-center items-center w-full print:hidden">
          <Button onClick={handleSave}>შენახვა</Button>
        </div>
      </div>
    </Modal>
  );
};
