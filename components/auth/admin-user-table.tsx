import React, { useEffect, useState, useTransition } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useCurrentUser } from "@/hooks/use-current-user";
import { Button } from '../ui/button';
import { fetchAllUserData } from '@/hooks/use-global-user';
import { UserRole } from '@prisma/client';
import Link from 'next/link';
import { settings } from '@/actions/settings';
import { MakeUserIntoCourier } from '@/actions/make-courier';


interface UserData {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    password: string | null;
    role: UserRole; // Replace with the actual type for 'UserRole'
}




const columns: ColumnsType<any> = [
    {
        title: 'Full Name',
        width: 100,
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
    },
    {
        title: 'Email',
        width: 100,
        dataIndex: 'email',
        key: 'email',
        fixed: 'left',
    },
    {
        title: 'ID',
        width: 100,
        dataIndex: 'id',
        key: 'id',
        fixed: 'left',
    },
    {
        title: 'Role',
        width: 100,
        dataIndex: 'role',
        key: 'role',
        fixed: 'left',
    },
    {
        title: 'Image',
        width: 100,
        dataIndex: 'image',
        key: 'image',
        fixed: 'left',
    },
    {
        title: 'Actions',
        key: 'actions',
        fixed: 'right',
        width: 100,
        render: (text, record) => (

            <Button onClick={async () => await MakeUserIntoCourier(record.email)}>change courier </Button>

        ),
    }
];

const AdminUserTable: React.FC = () => {
    const [userData, setUserData] = useState<UserData[]>([]);
    const [pending, startTransation] = useTransition();

    const onClick = () => {
        startTransation(() => {
            settings({
                role: UserRole.COURIER
            });
        });
    };

    useEffect(() => {
        // Fetch all user data when the component mounts
        fetchAllUserData()
            .then((fetchedUserData) => {
                setUserData(fetchedUserData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <>
            <Table columns={columns} dataSource={userData} scroll={{ x: 1500, y: 300 }} />
            {/* <Button disabled={pending} onClick={onClick}>
                Change role
            </Button> */}
        </>
    );
};

export default AdminUserTable;



