'use client'

import { ReactNode } from 'react'
import DashboardContent from './components/DashboardContent'
import { ModalProvider } from '@/contexts/Modalcontext'

export default function DashboardLayout({ children }: { readonly children: ReactNode }) {
  return (
    <ModalProvider>
      <DashboardContent>
        {children}
      </DashboardContent>
    </ModalProvider>
  )
}
