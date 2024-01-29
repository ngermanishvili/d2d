import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import './globals.css';
import NProgressWrapper from '@/components/ui/nprogress-bar';
import Footer from '@/components/ui/footer';
import Header from './_components/_client/_client_navigation/home-layout-navbar2';
import PanelNavbar from './_components/_admin/_panel_navigation/panel-navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'D2D.GE: საკურიერო სერვისები და ტრანსპორტირება საქართველოში',
  description: 'ისარგებლე სწრაფი საკურიერო სერვისებით და ტრანსპორტირებით საქართველოში',
  keywords: ['კურიერი', 'მიწოდება', 'გადაზიდვა', 'ტრანსპორტირება', 'შიპინგი', 'საქართველო', "კარგი სერვისი", "სწრაფი", "უსწრაფესი", "სატრანსპორტო მომსახურება", " ბიზნეს მომსახურება ", "საკურიერო მომსახურება", "kurieri", "miwodeba", "gadazidva", "transportireba", "shiping", "shipping", "saqartvelo", "sakurierio momsaxureba", "swrapi miwodeba", "swrafi miwodeba", "servisi", "swrafi", "swrapi", "uswrapesi", "mitana", "motana"],
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
  isSession: boolean;
}) {
  const session = await auth();
  const isSession = session ? true : false;

  return (
    <>
      <SessionProvider session={session}>

        <NProgressWrapper />
        <div className="bg-slate-50">
          <Header isSession={isSession} />
          <div className='p-2 w-full '>
            {session ? <PanelNavbar /> : null}
          </div>
          {children}
          <Footer />
        </div>
      </SessionProvider>
    </>
  );
}

