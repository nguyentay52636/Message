import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ReduxProvider } from "@/components/ReduxProvider";
import { SiderBar } from "@/components/shared/SiderBar/SiderBar";
import { Toaster } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

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
            <div className="h-screen w-full flex overflow-hidden bg-background">
       

              <div className="w-16 flex-shrink-0 z-30">
                <SiderBar />
              </div>

              <div className="flex-1 overflow-hidden">
                {children}
              </div>
            </div>
            <Toaster position="top-right" richColors />
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
