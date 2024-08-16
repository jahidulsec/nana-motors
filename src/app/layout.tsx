import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/contexts/ProgressBarProvider";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Nana Motors",
  description: "An account app",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}</Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
