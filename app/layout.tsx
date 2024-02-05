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
          <Providers>
            <body className="bg-slate-50">
              {/* Tawk.to Chat code */}
              <Script
                src="https://embed.tawk.to/65bcbaae8d261e1b5f5b3566/1hlkjieu7"
                strategy="lazyOnload"
              />

              <Header isSession={isSession} />
              <div className="p-2 w-full ">
                {session ? <PanelNavbar /> : null}
              </div>

              {children}
              <div id="fb-root"></div>
              <div id="fb-customer-chat" className="fb-customerchat"></div>

              <Script strategy="afterInteractive" id="fb-chat">
                {`
              var chatbox = document.getElementById('fb-customer-chat');
              chatbox.setAttribute("page_id", "115850238226188");
              chatbox.setAttribute("attribution", "biz_inbox");

              window.fbAsyncInit = function() {
                FB.init({
                  xfbml: true,
                  version: 'v18.0'
                });
              };

              (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
                fjs.parentNode.insertBefore(js, fjs);
              }(document, 'script', 'facebook-jssdk'));
              `}
              </Script>
              <Footer />
            </body>
          </Providers>
        </html>
      </SessionProvider>
    </>
  );
}
