
import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Provider from "@/Provider";


export const metadata: Metadata = {
  title: "SugarPuff",
  description: "Suresh & Arya's Sweet Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="w-full min-h-screen bg-linear-to-b from-red-200 to-white"
      >
        <Provider>        {children} </Provider>

      </body>
    </html>
  );
}
