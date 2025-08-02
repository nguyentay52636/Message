import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SiderBar } from "@/components/shared/SiderBar/SiderBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="h-screen w-screen flex overflow-hidden bg-background">
            <div className="hidden lg:flex w-16 flex-shrink-0 z-30">
              <SiderBar />
            </div>
            <div className="flex-1 overflow-hidden">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
