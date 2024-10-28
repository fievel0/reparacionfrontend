import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ModalProvider } from '@/contexts/Modalcontext'
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from '@/contexts/AuthContext'
import AuthCheck from '@/components/AuthCheck'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Web App REPARATION',
  description: 'Sistema de gestión de reparaciones',
}

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-stone-100 min-h-screen`}>
        <AuthProvider>
          <ModalProvider>
            <AuthCheck>
              {children}
            </AuthCheck>
            <Toaster />
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
