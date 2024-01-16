import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import { Toaster } from '@/components/ui/sonner'
import { RoleGate } from '@/components/auth/role-gate'
import { AdminNavbar } from './(protected)/_components/admin-navbar'
import { UserNavbar } from './(protected)/_components/user-navbar'


import './globals.css'
import NProgressWrapper from '@/components/ui/nprogress-bar'
import HomeLayoutNavigation from './_components/home-layout-navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({

  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();
  return (
    <>
      <SessionProvider session={session}>
        <NProgressWrapper />
        <html lang="en">
          <body
            className="p-4" >
            <div className="bg-gray-100">
              <HomeLayoutNavigation />
            </div>

            <RoleGate allowedRole="ADMIN">
              <AdminNavbar />
            </RoleGate>
            <RoleGate allowedRole="USER">
              <UserNavbar />
            </RoleGate>
            <Toaster />
            {children}
          </body>
        </html>
      </SessionProvider>
    </>

  )
}
