'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

const publicRoutes = ['/', '/login']

export default function AuthCheck({ children }: { readonly children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const checkAuth = () => {
      const isPublicRoute = publicRoutes.includes(pathname)
      
      if (!isAuthenticated() && !isPublicRoute) {
        router.push('/login')
      }
    }

    checkAuth()

    // Manejar el evento popstate para la navegación del historial
    const handlePopState = () => {
      checkAuth()
    }

    window.addEventListener('popstate', handlePopState)
    
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [router, pathname, isAuthenticated])

  return <>{children}</>
}
