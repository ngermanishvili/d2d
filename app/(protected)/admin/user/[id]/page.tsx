"use client"
import type { ColumnsType } from 'antd/es/table';
import { useCurrentUser } from "@/hooks/use-current-user";


const SpecificUser: React.FC = () => {
    const user = useCurrentUser();

    return (
        <>
            <div>
                <h2>{user?.name}</h2>
                <h2> {user?.email} </h2>
                <h2>{user?.image}</h2>
                <h2>{user?.id}</h2>
                <h2>{user?.role}</h2>
            </div>
        </>
    );
};

export default SpecificUser;
