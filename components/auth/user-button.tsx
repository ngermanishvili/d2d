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


export const UserButton = () => {
    const user = useCurrentUser();



    return (
        <DropdownMenu >
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ""} />
                    <AvatarFallback className="bg-red-500">
                        <FaUser className="text-white" />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-50" align="end">
                <h2 className="p-2 font-normal uppercase text-red-500 ">
                    {user?.name}
                </h2>

                <DropdownMenuItem >
                    <BiSolidCabinet className="h-4 w-4 mr-2" />
                    <Link href='/settings'>კაბინეტი</Link>

                </DropdownMenuItem>

                <DropdownMenuItem >
                    <BiSolidCabinet className="h-4 w-4 mr-2" />
                    <Link href='/settings'>ჩემი ინვოისები</Link>

                </DropdownMenuItem>

                <LogoutButton>
                    <DropdownMenuItem>
                        <DropdownMenuItem className="bg-black text-white w-full gap-12 cursor-pointer focus:bg-inherit" >
                            გასვლა
                            <ExitIcon className="h-4 w-4 mr-2" />
                        </DropdownMenuItem>

                    </DropdownMenuItem>

                </LogoutButton>
            </DropdownMenuContent>

        </DropdownMenu>
    );
};