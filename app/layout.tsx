import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { AppProvider } from "@/components/providers/app-provider"
import Header from "@/components/header/header"
import { Sidebar } from "@/components/sidebard/sidebar"
import { Separator } from "@/components/ui/separator"


const geist = Geist({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <body>
        <ThemeProvider>
          <AppProvider>
            <div className="flex h-svh w-svw text-f oreground">
              <aside className="h-full w-[20%] xl:w-[15%] 2xl:w-[15%] ">
                <Sidebar/>
              </aside>
              <Separator orientation="vertical" />
              <div className="flex flex-col h-full w-[80%] xl:w-[85%] 2xl:w-[85%]">
                <header className="w-full h-[8%] flex items-center px-4">
                  <Header/>
                </header>
                <main className="h-[92%] w-full overflow-hidden">
                  {children}
                </main>
              </div>
            </div>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
