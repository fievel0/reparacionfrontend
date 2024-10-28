'use client'

import { createContext, useContext, ReactNode, useMemo } from 'react'

interface AuthContextType {
  logout: () => void
  isAuthenticated: () => boolean
  // Añade aquí otras propiedades de autenticación que necesites
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider(props: Readonly<{ children: ReactNode }>) {
  const { children } = props; // Desestructurar props para marcar como de solo lectura

  const logout = () => {
    localStorage.removeItem('jwtToken'); // Elimina el token
    // Otras limpiezas si es necesario
  }

  const isAuthenticated = () => {
    const token = localStorage.getItem('jwtToken')
    if (!token) return false
    
    try {
      // Verificar si el token ha expirado
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload.exp * 1000 > Date.now()
    } catch {
      return false
    }
  }

  const value = useMemo(() => ({
    logout,
    isAuthenticated
  }), []);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }
  return context
}
