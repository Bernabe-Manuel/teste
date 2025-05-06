import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { RestaurantProvider } from "@/contexts/restaurant-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Restaurante da Manança - Sabores de Angola",
  description: "Restaurante especializado em pratos típicos angolanos em Kilamba, Luanda",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <RestaurantProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </RestaurantProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
