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
      {/* Agregamos overflow-hidden en body para evitar scrolls no deseados del navegador */}
      <body className="overflow-hidden">
        <ThemeProvider>
          <AppProvider>
            {/* h-svh y w-svw con overflow-hidden aseguran un marco estricto del tamaño de pantalla */}
            <div className="flex h-svh w-svw overflow-hidden text-foreground">
            
              {/* Sidebar con shrink-0 para evitar que se deforme */}
              <aside className="h-full w-[20%] xl:w-[15%] 2xl:w-[15%] shrink-0">
                <Sidebar />
              </aside>

              <Separator orientation="vertical" />

              {/* Panel principal: flex-1 para ocupar el espacio horizontal restante + min-w-0 */}
              <div className="flex flex-col h-full flex-1 min-w-0 min-h-0 overflow-hidden">
              
                {/* Header: shrink-0 para que NUNCA se reduzca ni fuerce cálculos de porcentaje */}
                <header className="w-full shrink-0 flex items-center px-4 py-3">
                  <Header />
                </header>

                {/* Main: flex-1 para tomar exactamente TODO el alto restante, sin percentages */}
                <main className="flex-1 w-full min-h-0 min-w-0 overflow-hidden">
                  {children}
                </main>

              </div>
            </div>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
