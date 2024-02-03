'use client'

import { useState, useRef, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import Link from 'next/link'
import { Button } from 'antd'

interface MobileMenuProps {
    navItems: { to: string; name: string }[];
}

export default function MobileMenu({ navItems }: MobileMenuProps) {
    const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false)

    const trigger = useRef<HTMLButtonElement>(null)
    const mobileNav = useRef<HTMLDivElement>(null)

    // close the mobile menu on click outside
    useEffect(() => {
        const clickHandler = ({ target }: { target: EventTarget | null }): void => {
            if (!mobileNav.current || !trigger.current) return;
            if (!mobileNavOpen || mobileNav.current.contains(target as Node) || trigger.current.contains(target as Node)) return;
            setMobileNavOpen(false)
        };
        document.addEventListener('click', clickHandler)
        return () => document.removeEventListener('click', clickHandler)
    })

    // close the mobile menu if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }: { keyCode: number }): void => {
            if (!mobileNavOpen || keyCode !== 27) return;
            setMobileNavOpen(false)
        };
        document.addEventListener('keydown', keyHandler)
        return () => document.removeEventListener('keydown', keyHandler)
    })

    return (
        <div className="flex md:hidden">
            {/* Hamburger button */}
            <Button
                ref={trigger}
                className={`hamburger ${mobileNavOpen && 'active'}`}
                aria-controls="mobile-nav"
                aria-expanded={mobileNavOpen}
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
                <span className="sr-only">Menu</span>
                <svg className="w-6 h-6  fill-current text-white-900" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <rect className='text-white' y="4" width="24" height="2" />
                    <rect className='text-white' y="11" width="24" height="2" />
                    <rect className='text-white' y="18" width="24" height="2" />
                </svg>
            </Button>

            {/*Mobile navigation */}
            <div ref={mobileNav}>
                <Transition
                    show={mobileNavOpen}
                    as="nav"
                    id="mobile-nav"
                    className="absolute top-full h-screen pb-16 z-20 left-0 w-full overflow-scroll bg-gray-900"
                    enter="transition ease-out duration-200 transform"
                    enterFrom="opacity-0 -translate-y-2"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-out duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <ul className="px-5 py-2">

                        {navItems.map((item, index) => (
                            <li key={index}>
                                <Link href={item.to} className="flex  bg-red-400 text-white rounded-sm m-2 w-full font-semibold  py-2  justify-center" onClick={() => setMobileNavOpen(false)}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <Link onClick={() => setMobileNavOpen(false)} className=' mt-14 p-2 rounded-sm mx-6 text-black bg-white  flex items-center justify-center' href="/auth/login" passHref>
                        ავტორიზაცია
                    </Link>

                    <Link onClick={() => setMobileNavOpen(false)} className='mt-4 rounded-sm mx-6  p-2 text-black bg-white  px-4 flex items-center justify-center' href="/auth/register" passHref>
                        რეგისტრაცია
                    </Link>



                </Transition>
            </div >
        </div >
    )
}
