'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch('http://localhost:8084/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const responseText = await response.text()
      let data
      try {
        data = JSON.parse(responseText)
      } catch {
        console.error('Error al analizar JSON:', responseText)
        setError('Error en la respuesta del servidor')
      }

      if (response.ok) {
        if (data.jwtToken) {
          localStorage.setItem('jwtToken', data.jwtToken)
          router.push('/dashboard')
        } else {
          setError('Token no recibido del servidor')
        }
      } else {
        setError(data.message || 'Credenciales inválidas')
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error)
      setError('Error al conectar con el servidor')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-500">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Iniciar sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" className="w-full">Iniciar sesión</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}