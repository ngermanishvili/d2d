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
  const inputRef = useRef<InputRef>(null);
  const { address, setAddress } = useAddressStore();

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const arrOfAddress = await axios.get("/api/shipments/address");
        const array = arrOfAddress.data;
        const newarr = array
          .map((elementi: any) => elementi.address)
          .filter((v: any, i: any, self: any) => {
            // It returns the index of the first
            // instance of each value
            return i == self.indexOf(v);
          });
        setItems(newarr);
        console.log("🚀 ~ fetchAddress ~ array:", newarr);
        // const arrofAdr = array.map((item: any) => item.adress);
        // setItems(arrofAdr);
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
    setItems([...items, name || `New item ${items.length}`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
    console.log(inputRef.current?.input);
  };

  return (
    <Select
      style={{ width: 300 }}
      placeholder="Custom dropdown render"
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: "8px 0" }} />
          <Space style={{ padding: "0 8px 4px" }}>
            <Input
              placeholder="Please enter item"
              ref={inputRef}
              value={name}
              onChange={onNameChange}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              Add item
            </Button>
          </Space>
        </>
      )}
      options={items.map((item) => ({ label: item, value: item }))}
    />
  );
};

export default AdressInput;
