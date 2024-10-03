'use client'


import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function LoginForm() {
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
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()
        if (data.jwtToken) {
          localStorage.setItem('jwtToken', data.jwtToken)
          router.push('/dashboard')
        }
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Credenciales inválidas')
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error)
      setError('Error al conectar con el servidor')
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Entrar en Registro de Reparaciones</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex items-center justify-between">
            <Button type="submit">
              Entrar
            </Button>
            <a className="text-sm text-blue-600 hover:underline" href="#">
              ¿Se olvidó su ID de usuario o su contraseña?
            </a>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          ¿No tiene una cuenta en Reparaciones? <a href="#" className="text-blue-600 hover:underline">Crear una cuenta</a>
        </p>
      </CardContent>
    </Card>
  )
}