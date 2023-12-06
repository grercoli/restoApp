import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { KioskoProvider } from "../context/KioskoProvider";
import Sidebar from "../components/Sidebar";
import Pasos from "../components/Pasos";

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
          <div className="md:flex">
            <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5">
              <Sidebar />
            </aside>
            <main className="md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll">
              <div className="p-10">
                <Pasos />
                {children}
              </div>
            </main>
          </div>
        </KioskoProvider>
      </body>
    </html>
  )
}
