import React, { useState, useRef, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
// import { Divider, Input, Select, Space, Button } from "antd";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { InputRef } from "antd";
import db from "@/lib/db";
import { currentUserId } from "@/lib/auth";
import axios from "axios";
import useAddressStore from "@/hooks/adress-store";
import { FaAddressBook } from "react-icons/fa";
import useEmailStore from "@/hooks/set-courier-for-shipment";

const CourierInput: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [misamarti, setMisamarti] = useState<string>(""); // Separate state for selected address
  const inputRef = useRef<InputRef>(null);
  const [address, setAddress] = useState(""); // Destructure setMisamarti from useAddressStore if needed
  const email = useEmailStore((state: any) => state.email);
  const setEmail = useEmailStore((state: any) => state.setEmail);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const arrOfAddress = await axios.get("/api/couriers");
        const array = arrOfAddress.data;
        const newarr: any = array
          .filter((e: any) => e.role === "COURIER")
          .map((elementi: any) => elementi.email)
          .filter((v: any, i: any, self: any) => {
            return i == self.indexOf(v);
          });
        console.log("🚀 ~ fetchAddress ~ newarr:", newarr);

        setItems(newarr);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddress();
  }, []);

  return (
    <div className="relativew xl:w-full">
      {/* <Select
        className="w-[150px] xl:w-full h-[50px] "
        placeholder="აირჩიეთ კურიერი"
        onChange={(value: string) => {
          setEmail(value);
        }} // Update selected address
        dropdownRender={(menu: any) => <>{menu}</>}
        options={items.map((item) => ({ label: item, value: item }))}
      /> */}
      <Select
        value={email}
        onValueChange={(newValue) => {
          setEmail(newValue);
        }}
      >
        <SelectTrigger className="xl:w-[300px]">
          <SelectValue placeholder="აირჩიეთ კურიერი">{email}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {items.map((element) => {
            return <SelectItem value={element}>{element}</SelectItem>;
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CourierInput;
