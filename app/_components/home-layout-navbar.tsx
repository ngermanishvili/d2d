// "use client";
// import Container from '@/components/ui/container';
// import Logo from '@/components/ui/logo';
// import { LoginButton } from "@/components/auth/login-button";
// import { Button } from "@/components/ui/button";
// import { UserButton } from '@/components/auth/user-button';
// import { logout } from '@/actions/logout';  // Import the logout function


// const HomeLayoutNavigation = () => {


//     return (
//         <div className="fixed top-0 w-full bg-white z-10 shadow-sm">
//             <div className="py-4 border-b-[1px]">
//                 <Container>
//                     <div className="flex flex-row items-center justify-between gap-4 md:gap-0">
//                         <Logo />
//                         <LoginButton>


//                             <Button
//                                 className='mr-[40px]'
//                                 size='lg'
//                                 variant='destructive'
//                                 onClick={logout}


//                             >
//                                 Logout
//                             </Button>


//                             <Button
//                                 className='mr-[40px]'
//                                 size='lg'
//                                 variant='destructive'
//                             >
//                                 შესვლა
//                             </Button>

//                             <UserButton />
//                         </LoginButton>
//                     </div>
//                 </Container>
//             </div>
//         </div>
//     );
// };

// export default HomeLayoutNavigation;
"use client"
import React from "react";
import {
    Navbar as MTNavbar,
    Collapse,
    IconButton,
    Typography,
    Button,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "@/components/ui/logo";
import Link from "next/link";

interface NavItemProps {
    children: React.ReactNode;
    href?: string;
}
function NavItem({ children, href }: NavItemProps) {
    return (
        <li>
            <Typography
                placeholder=''
                as="a"
                href={href || "#"}
                target={href ? "_blank" : "_self"}
                variant="small"
                className="font-medium"
            >
                {children}
            </Typography>
        </li>
    );
}

export function HomeLayoutNavigation() {
    const [open, setOpen] = React.useState(false);
    const [isScrolling, setIsScrolling] = React.useState(false);

    function handleOpen() {
        setOpen((cur) => !cur);
    }

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpen(false)
        );
    }, []);

    React.useEffect(() => {
        function handleScroll() {
            if (window.scrollY > 0) {
                setIsScrolling(true);
            } else {
                setIsScrolling(false);
            }
        }

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <MTNavbar
            placeholder=''
            fullWidth
            shadow={false}
            blurred={false}
            style={{ backgroundColor: isScrolling ? "white" : "black" }}
            color={isScrolling ? "white" : "gray"}
            className="fixed top-0 z-50 border-0"
        >
            <div className="container mx-auto flex items-center justify-between">
                <Logo />
                <ul
                    className={`ml-10 hidden items-center gap-6 lg:flex ${isScrolling ? "white" : "white"
                        }`}
                >
                    <NavItem>მთავარი</NavItem>
                    <NavItem>სერვისები</NavItem>
                    <NavItem>კონტაქტი</NavItem>
                    <NavItem href="https://www.material-tailwind.com/docs/react/installation">
                        Docs
                    </NavItem>
                </ul>
                <div className="hidden gap-2 lg:flex lg:items-center">
                    <IconButton
                        placeholder=''
                        variant="text"
                        color={isScrolling ? "white" : "white"}
                        size="sm"
                    >
                        <i className="fa-brands fa-twitter text-base" />
                    </IconButton>
                    <IconButton
                        placeholder=''
                        variant="text"
                        color={isScrolling ? "white" : "white"}
                        size="sm"
                    >
                        <i className="fa-brands fa-facebook text-base" />
                    </IconButton>
                    <IconButton
                        placeholder=''
                        variant="text"
                        color={isScrolling ? "white" : "white"}
                        size="sm"
                    >
                        <i className="fa-brands fa-instagram text-base" />
                    </IconButton>
                    <div className="p-2">
                        <Button placeholder='რეგისტრაცია' color={isScrolling ? "gray" : "gray"} size="sm">
                            <Link className="w-full" href="/auth/login" passHref>
                                ავტორიზაცია
                            </Link>
                        </Button>
                        <Button className="ml-4" placeholder='ავტორიზაცია' color={isScrolling ? "gray" : "gray"} size="sm">
                            <Link className="w-full p-2" href="/auth/register" passHref>
                                რეგისტრაცია
                            </Link>
                        </Button>
                    </div>
                </div>
                <IconButton
                    placeholder=''
                    variant="text"
                    color={isScrolling ? "gray" : "white"}
                    onClick={handleOpen}
                    className="ml-auto inline-block lg:hidden"
                >
                    {open ? (
                        <XMarkIcon strokeWidth={2} className="h-6 w-6" />
                    ) : (
                        <Bars3Icon strokeWidth={2} className="h-6 w-6" />
                    )}
                </IconButton>
            </div>
            <Collapse open={open}>
                <div className="container mx-auto mt-4 rounded-lg border-t border-blue-gray-50 bg-white px-6 py-5">
                    <ul className="flex flex-col gap-4 text-blue-gray-900">
                        <NavItem>Home</NavItem>
                        <NavItem>About Us</NavItem>
                        <NavItem>Contact Us</NavItem>
                        <NavItem href="https://www.material-tailwind.com/docs/react/installation">
                            Docs
                        </NavItem>
                    </ul>
                    <div className="mt-4 flex items-center gap-2">
                        <IconButton placeholder='' variant="text" color="gray" size="sm">
                            <i className="fa-brands fa-twitter text-base" />
                        </IconButton>
                        <IconButton placeholder='' variant="text" color="gray" size="sm">
                            <i className="fa-brands fa-facebook text-base" />
                        </IconButton>
                        <IconButton placeholder='' variant="text" color="gray" size="sm">
                            <i className="fa-brands fa-instagram text-base" />
                        </IconButton>
                        <div>
                            <Button placeholder='' color="gray" size="sm" className="ml-auto">
                                ავტორიზაცია
                            </Button>

                        </div>
                    </div>
                </div>
            </Collapse>
        </MTNavbar>
    );
}

export default HomeLayoutNavigation;
