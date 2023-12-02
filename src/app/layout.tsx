import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { KioskoProvider } from "../context/KioskoProvider";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Café App',
  description: 'Servicio de cafeteria',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <KioskoProvider>
          {children}
        </KioskoProvider>
      </body>
    </html>
  )
}
