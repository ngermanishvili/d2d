"use client";
import Container from '@/components/ui/container';
import Logo from '@/components/ui/logo';
import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { UserButton } from '@/components/auth/user-button';
import { logout } from '@/actions/logout';  // Import the logout function


const HomeLayoutNavigation = () => {


    return (
        <div className="fixed top-0 w-full bg-white z-10 shadow-sm">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-4 md:gap-0">
                        <Logo />
                        <LoginButton>


                            <Button
                                className='mr-[40px]'
                                size='lg'
                                variant='destructive'
                                onClick={logout}


                            >
                                Logout
                            </Button>


                            <Button
                                className='mr-[40px]'
                                size='lg'
                                variant='destructive'
                            >
                                შესვლა
                            </Button>

                            <UserButton />
                        </LoginButton>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default HomeLayoutNavigation;
