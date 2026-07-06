import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from '@vercel/analytics/next';

const pops = Poppins({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
});


export const metadata: Metadata = {
  title: "NNEGEN — AI Content Generator",
  description: "Create blogs, social posts, emails, code explanations, and more with focused AI writing tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={pops.className}
      >
        {children}
        <Analytics />
      </body>
    </html>
    </ClerkProvider>
  );
}
