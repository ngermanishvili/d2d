
import type { Metadata } from 'next'


export const metadata: Metadata = {
    title: 'კონფიდენციალურობის პირობები - D2D.GE',
    description: 'კონფიდენციალურობის პირობები - D2D.GE',
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
