"use client";

import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "next-themes";
import "../styles/index.css";
import "../styles/prism-vsc-dark-plus.css";
import Script from 'next/script'; // Import the Script component
import PreLoader from "@/components/Common/PreLoader";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html suppressHydrationWarning={true} className="!scroll-smooth" lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=GTM-NH4TFZQS`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {loading ? (
          <PreLoader />
        ) : (

          <ThemeProvider
            attribute="class"
            enableSystem={false}
            defaultTheme="light"
          >

            <Header />
            {children}
            {/* <Footer /> */}
            <ScrollToTop />
          </ThemeProvider>

        )}
      </body>
    </html>
  );
}
