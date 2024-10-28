'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from '@/hooks/use-toast'
import { Cpu } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

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
        toast({
          title: "Error",
          description: "Error en la respuesta del servidor",
          variant: "destructive",
        })
        return
      }

      if (response.ok) {
        if (data.jwtToken) {
          localStorage.setItem('jwtToken', data.jwtToken)
          router.push('/dashboard')
          toast({
            title: "Éxito",
            description: "Inicio de sesión exitoso",
          })
        } else {
          toast({
            title: "Error",
            description: "Token no recibido del servidor",
            variant: "destructive",
          })
        }
      } else {
        toast({
          title: "Error",
          description: data.message || "Credenciales inválidas",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error)
      toast({
        title: "Error",
        description: "Error al conectar con el servidor",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-[url('/images/repair-workspace.jpg')] bg-cover bg-center bg-fixed">
      <div className="min-h-screen bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center">
        <div className="flex items-center mb-8">
          <Cpu className="h-8 w-8 text-orange-500 mr-2" />
          <span className="font-bold text-2xl text-white">Web App Reparaciones</span>
        </div>
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Iniciar sesión</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <Button type="submit" className="w-full">
                Iniciar sesión
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
