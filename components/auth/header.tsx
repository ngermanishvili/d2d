import { cn } from '@/lib/utils'

import { Poppins } from 'next/font/google'
import Head from 'next/head'

const font = Poppins({
    subsets: ['latin'],
    weight: ['600']
})

interface HeaderProps {
    label: string
}

export const Header = ({
    label
}: HeaderProps) => {
    return (
        <div className='w-full flex flex-col gap-y-4 items-center justify-center'>

            <h1 className='text-3xl font-semibold'>{label}</h1>
        </div>
    )
}