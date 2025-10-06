"use client"
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ReduxProvider } from "@/components/ReduxProvider";
import { Toaster } from "sonner";
import { SiderBar } from "@/components/shared/SiderBar/SiderBar";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith("/auth");

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >

          <ReduxProvider>
            {!isAuthRoute ? (
              <div className="h-screen w-full flex">
                <div className="h-full">
                  <SiderBar />
                </div>
                <main className="flex-1 h-full overflow-auto">
                  {children}
                </main>
              </div>
            ) : (
              <>{children}</>
            )}
            <Toaster position="top-right" richColors />
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
