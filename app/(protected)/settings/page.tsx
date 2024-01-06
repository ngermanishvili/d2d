
"use client"

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";

const SettingsPage = () => {
    const user = useCurrentUser();

    const onClick = () => {
        logout();
    }

    return (
        <div className="bg-white p-10 rounder-xl">
            <button onClick={onClick} className='w-[400px] bg-black text-white' type='submit'>Sign Out</button>
        </div >
    )
}

export default SettingsPage