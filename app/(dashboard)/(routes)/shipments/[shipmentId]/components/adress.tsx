import React, { useState, useRef, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Divider, Input, Select, Space, Button } from "antd";
import type { InputRef } from "antd";
import { db } from "@/lib/db";
import { currentUserId } from "@/lib/auth";
import axios from "axios";
import useAddressStore from "@/hooks/adress-store";

const AdressInput: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [address, setMisamarti] = useState<string>(""); // Separate state for selected address
  const inputRef = useRef<InputRef>(null);
  const { setAddress } = useAddressStore(); // Destructure setMisamarti from useAddressStore if needed

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const arrOfAddress = await axios.get("/api/shipments/address");
        const array = arrOfAddress.data;
        const newarr: any = array
          .map((elementi: any) => elementi.address)
          .filter((v: any, i: any, self: any) => {
            return i == self.indexOf(v);
          });
        setItems(newarr);
        setMisamarti(newarr[0]); // Set default selected address
        console.log("🚀 ~ fetchAddress ~ array:", newarr);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddress();
  }, []);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setAddress(event.target.value);
  };

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    if (name.length === 0) {
      return;
    }
    setItems([...items, name]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
    console.log(inputRef.current?.input);
  };

  return (
    <Select
      value={address} // Use separate state for the value
      style={{ width: "100%", height: "36px" }}
      placeholder="Select address"
      onChange={(value) => setMisamarti(value)} // Update selected address
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider />
          <Space>
            <Input
              placeholder="Please enter address"
              ref={inputRef}
              value={name}
              onChange={onNameChange}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              Add Address
            </Button>
          </Space>
        </>
      )}
      options={items.map((item) => ({ label: item, value: item }))}
    />
  );
};

export default AdressInput;
