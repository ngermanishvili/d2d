"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCurrentId } from "@/hooks/use-current-role";
import { InvoiceClient } from "./components/client";
import { InvoiceColumn } from "./components/columns";
import Image from "next/image";
import FinanceImg from "@/assets/images/finances.png";
import { currentRole } from "@/lib/auth";



const MyInvoicesPage = () => {

  const [data, setdata] = useState<InvoiceColumn[]>([]);
  const id = useCurrentId();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/invoices/${id}`);
        setdata(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-4 ">ფინანსები</h2>
      <Image
        alt="finances"
        style={{ width: "100%", height: "300px", objectFit: "cover" }}
        src="https://plus.unsplash.com/premium_photo-1677022383068-d7c70c446ac1?q=80&w=2920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        width={300}
        height={300} />
      <div className="p-8">
        <InvoiceClient data={data} />
      </div>
    </>
  );
};

export default MyInvoicesPage;
