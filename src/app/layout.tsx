
import { Toaster } from "@/components/ui/toaster";
import { AuthContextProvider } from "@/context/AuthContext";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "BloodConnect - Donate Blood, Save Lives",
  description: "Connect with blood donors and campaigns in your area. Real-time blood availability dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased min-h-screen bg-background`}>
        <AuthContextProvider>
          {children}
          <Toaster />
        </AuthContextProvider>
      </body>
    </html>
  );
}
