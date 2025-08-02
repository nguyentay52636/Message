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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="h-screen w-full flex overflow-hidden bg-background">
            {/* Main Sidebar - Always visible */}
            <div className="flex w-16 flex-shrink-0 z-30">
              <SiderBar />
            </div>
            {/* Chat Area - Takes remaining space */}
            <div className="flex-1 overflow-hidden">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
