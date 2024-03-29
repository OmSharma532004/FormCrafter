

import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster"
import { Inter } from "next/font/google";
import "./globals.css";
import { useRef } from 'react'
import { UserProvider } from "@/lib/contextapi/UserProvider";

import { LoadingProvider } from "@/lib/contextapi/loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>

<LoadingProvider>
   <UserProvider>
   {children}
   <Toaster />
   </UserProvider>

   </LoadingProvider>
    
      </body>
    </html>
  );
}
