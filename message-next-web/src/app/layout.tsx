import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ReduxProvider } from "@/components/ReduxProvider";
import { Toaster } from "sonner";
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
          <ReduxProvider>
            <div className="flex h-screen w-full bg-background">
              <SiderBar />
              {children}
            </div>
            <Toaster position="top-right" richColors />
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
