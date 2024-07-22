import type { Metadata } from "next";
// import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/contexts/ProgressBarProvider";


// const fontSans = Poppins({
//   subsets: ["latin"],
//   variable: "--font-sans",
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
// });

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
      <body
        className={cn(
          "bg-teal-50/75 font-sans antialiased",
          // fontSans.variable,
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
