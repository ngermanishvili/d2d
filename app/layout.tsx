import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";
import Footer from "@/components/ui/footer";
import Header from "./_components/_client/_client_navigation/home-layout-navbar2";
import PanelNavbar from "./_components/_admin/_panel_navigation/panel-navbar";
import Providers from "./_components/_client/Providers";
import Script from "next/script";
import Head from "next/head";
import ToasterProvider from "@/providers/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "D2D.GE: საკურიერო სერვისები და ტრანსპორტირება საქართველოში",
  description: "Generated by create next app",
  keywords: [
    "კურიერი",
    "მიწოდება",
    "გადაზიდვა",
    "ტრანსპორტირება",
    "შიპინგი",
    "საქართველო",
    "კარგი სერვისი",
    "სწრაფი",
    "უსწრაფესი",
    "სატრანსპორტო მომსახურება",
    " ბიზნეს მომსახურება ",
    "საკურიერო მომსახურება",
    "kurieri",
    "miwodeba",
    "gadazidva",
    "transportireba",
    "shiping",
    "shipping",
    "saqartvelo",
    "sakurierio momsaxureba",
    "swrapi miwodeba",
    "swrafi miwodeba",
    "servisi",
    "swrafi",
    "swrapi",
    "uswrapesi",
    "mitana",
    "motana",
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
  isSession: boolean;
}) {
  const session = await auth();
  let isSession = session ? true : false;

  return (
    <>
      <SessionProvider session={session}>
        <html lang="en">
          <head>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-1609WJF57Q"></Script>
            <Script id="google-analytics">
              {
                `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-1609WJF57Q');
                `
              }

            </Script>
          </head>
          {/* Tawk.to Chat code */}
          <Script
            src="https://embed.tawk.to/65d09dc78d261e1b5f61cb53/1hmregl4e"
            strategy="lazyOnload"
          />
          <body className="bg-slate-50">
            <Providers>
              <Header isSession={isSession} />
              <div className="p-2 w-full ">
                {session ? <PanelNavbar /> : null}
              </div>
              {children}
              <ToasterProvider />
              <Footer />
            </Providers>
          </body>
        </html>
      </SessionProvider>
    </>
  );
}
