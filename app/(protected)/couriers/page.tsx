"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { UsersClient } from "./components/client";
import { UsersColumn } from "./components/columns";


const CouriersPage = () => {
  const [users, setUsers] = useState<UsersColumn[]>([]); // Fix the initialization of state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/couriers");
        // Assuming the response.data is an array of users
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log("🚀 ~ CouriersPage ~ users:", users);

  const formattedUsers = users.map((item) => ({
    id: item.id,
    name: item.name || "",
    email: item.email || "",
    number: item.number || "",
    image: item.image || "",
    role: item.role,
  }));

  return (
    <div style={{ marginTop: "70px" }}>
      <UsersClient data={formattedUsers} />
    </div>
  );
};

export default CouriersPage;
