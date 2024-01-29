
import type { Metadata } from 'next'


export const metadata: Metadata = {
    title: 'ბლოგები - D2D.GE',
    description: 'ახალ დამატებული ბლოგები- D2D.GE',
}

export default async function RootLayout({
    children,

}: {
    children: React.ReactNode
}) {


    return (
        <>
            <div className='p-20'>
                {children}
            </div>

        </>

    )
}
