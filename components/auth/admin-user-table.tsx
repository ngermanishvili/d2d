import React, {useEffect, useState, useCallback} from "react";
import {Table} from "antd";
import type {ColumnsType} from "antd/es/table";
import {fetchAllUserData} from "@/hooks/use-global-user";
import {UserRole} from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Button} from "../ui/button";
import {DeleteUser} from "@/actions/delete-user";

interface UserData {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
  role: UserRole; // Replace with the actual type for 'UserRole'
}

const AdminUserTable: React.FC = () => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const handleDeleteUser = useCallback(async (id: string) => {
    try {
      await DeleteUser(id);
      setUserData((prevUserData) =>
        prevUserData.filter((user) => user.id !== id)
      );
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }, []);
  useEffect(() => {
    fetchAllUserData()
      .then((fetchedUserData) => {
        setUserData(fetchedUserData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [handleDeleteUser]);

  const columns: ColumnsType<any> = [
    {
      title: "Full Name",
      width: 100,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Email",
      width: 100,
      dataIndex: "email",
      key: "email",
      fixed: "left",
    },
    {
      title: "ID",
      width: 100,
      dataIndex: "id",
      key: "id",
      fixed: "left",
    },
    {
      title: "Role",
      width: 100,
      dataIndex: "role",
      key: "role",
      fixed: "left",
    },
    {
      title: "Image",
      width: 100,
      dataIndex: "image",
      key: "image",
      fixed: "left",
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 100,
      render: (text, record) => (
        <div className="flex justify-center items-center gap-1">
          <Select defaultValue={record.role}>
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={UserRole.USER}>User</SelectItem>
              <SelectItem value={UserRole.COURIER}>Courier</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => handleDeleteUser(record.id)}>delete</Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={userData}
        scroll={{x: 1500, y: 300}}
      />
    </>
  );
};

export default AdminUserTable;
