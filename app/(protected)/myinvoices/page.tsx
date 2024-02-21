"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCurrentId } from "@/hooks/use-current-role";

const MyInvoicesPage = () => {
  const [data, setdata] = useState("");
  const id = useCurrentId();
  console.log("🚀 ~ CouriersPage ~ id:", id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/invoices/${id}`
        );
        setdata(response.data);
        // Assuming the response.data is an array of users
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ marginTop: "70px" }}>
      {data.length > 1 ? "daifetcha" : "aaraa"}
    </div>
  );
};

export default MyInvoicesPage;
