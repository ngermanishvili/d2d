'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from '@/assets/images/d2d.jpg';
import MobileMenu from "./mobile-navbar-menu";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { NAV_MENU_GLOBAL } from '@/routes/global-navbar-routes';
import { UserButton } from '@/components/auth/user-button';



export default function Header({ isSession }: { isSession: boolean }) {
    const [top, setTop] = useState<boolean>(true);

    // detect whether the user has scrolled the page down by 10px
    const scrollHandler = () => {
        window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };

    useEffect(() => {
        scrollHandler();
        window.addEventListener('scroll', scrollHandler);
        return () => window.removeEventListener('scroll', scrollHandler);
    }, [top]);

    return (
        <header className={`fixed w-full bg-black text-white z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top ? 'bg-white text-black backdrop-blur-sm shadow-lg' : ''}`}>
            <div className="max-w-6xl mx-auto px-5 sm:px-6">
                <div className="flex items-center justify-between h-16 md:h-20">

                    {/* Site branding */}
                    <div className="shrink-0">
                        <Image className='rounded-md' src={Logo} alt="Logo" width={80} height={60} />
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex md:grow flex-grow justify-center items-center gap-6">
                        {/* Dynamically generate navigation items */}
                        {NAV_MENU_GLOBAL.map((item, index) => (
                            <Link key={index} href={item.to} passHref>
                                <div className=''>{item.name}</div>
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop sign in links */}


                    {isSession ? <UserButton />
                        :
                        <div className="p-2">
                            <Button size="sm">
                                <Link href="/auth/login" passHref>
                                    ავტორიზაცია
                                </Link>
                            </Button>
                            <Button className="ml-4" size="sm">
                                <Link href="/auth/register" passHref>
                                    რეგისტრაცია
                                </Link>
                            </Button>

                        </div>}
                    <MobileMenu />

                </div>
            </div>
        </header>
    )
}
