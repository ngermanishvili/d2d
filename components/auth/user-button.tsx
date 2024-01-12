"use client";

import Link from "next/link"
import { FaUser } from "react-icons/fa";
import { ExitIcon, } from "@radix-ui/react-icons"
import { BiSolidCabinet } from "react-icons/bi";



import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import { getAccountByUserId } from "@/data/account";
import { fetchUserById } from "@/hooks/fetch-user-data";

export const UserButton = () => {
    const user = useCurrentUser();



    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ""} />
                    <AvatarFallback className="bg-sky-500">
                        <FaUser className="text-white" />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
                <h2 className="p-2 font-normal uppercase text-blue-400 ">
                    {user?.name}
                </h2>

                <DropdownMenuItem >
                    <BiSolidCabinet className="h-4 w-4 mr-2" />
                    <Link href='/settings'>კაბინეტი</Link>
                </DropdownMenuItem>
                <LogoutButton>
                    <DropdownMenuItem>
                        <ExitIcon className="h-4 w-4 mr-2" />
                        <DropdownMenuItem >
                            Logout
                        </DropdownMenuItem>

                    </DropdownMenuItem>

                </LogoutButton>
            </DropdownMenuContent>

        </DropdownMenu>
    );
};