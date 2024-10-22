'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { api } from '@/utils/api'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'
import { useModal } from '@/contexts/Modalcontext'

export default function NewClientModal() {
  const { isNewClientOpen, closeAllModals } = useModal()
  const [formData, setFormData] = useState({
    name: '',
    cardIdentifi: '',
    phone: '',
    mail: ''
  })
  const router = useRouter()

  useEffect(() => {
    if (isNewClientOpen) {
      // Restablecer los campos a valores vacíos cuando se abra el modal
      setFormData({
        name: '',
        cardIdentifi: '',
        phone: '',
        mail: ''
      })
    }
  }, [isNewClientOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Formulario enviado')
    try {
      const response = await api.post('/customer/save', { ...formData, id_customer: 0, rep_orderList: [] })
      console.log('Respuesta de la API:', response)
      if (response.ok) {
        closeAllModals()
        toast({
          title: "Éxito",
          description: "El cliente ha sido guardado correctamente.",
        })
        console.log('Cliente guardado exitosamente')
      } else {
        console.error('Error en la respuesta de la API')
        toast({
          title: "Error",
          description: "Ya existe otro cliente con el mismo número de identificación. Por favor verifique el número e intente de nuevo.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error al guardar el cliente:', error)
      if (error instanceof Error && error.message === 'Token expired') {
        router.push('/login')
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <Dialog open={isNewClientOpen} onOpenChange={closeAllModals}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nuevo Cliente</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="cardIdentifi">Identificación</Label>
            <Input id="cardIdentifi" name="cardIdentifi" value={formData.cardIdentifi} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="phone">Teléfono</Label>
            <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="mail">Correo</Label>
            <Input id="mail" name="mail" type="email" value={formData.mail} onChange={handleChange} required />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={closeAllModals}>Cancelar</Button>
            <Button type="submit">Guardar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
