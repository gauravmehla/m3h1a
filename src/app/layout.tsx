import type { Metadata } from "next";
import { ThemeProvider } from "@/app/components/theme-provider";

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gaurav Mehla",
  description: "Build with ❤️ by Gaurav Mehla",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div>{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
