import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "../styles/animations.css" // Import our custom animations
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import CustomScrollbar from "@/components/custom-scrollbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Indian Weather App",
  description: "Get real-time weather updates for cities across India and worldwide",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <CustomScrollbar />
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'