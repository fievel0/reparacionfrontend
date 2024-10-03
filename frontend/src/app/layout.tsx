import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ModalProvider } from '@/contexts/Modalcontext'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Web App REPARATION',
  description: 'Sistema de gestión de reparaciones',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ModalProvider>
          {children}
          
        </ModalProvider>
      </body>
    </html>
  )
}