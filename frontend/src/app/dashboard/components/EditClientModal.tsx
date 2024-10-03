import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from '@/hooks/use-toast'
import { Client } from '../type/Client'

interface EditClientModalProps {
  client: Client;
  onSave: (client: Client) => void;
  onCancel: () => void;
}

export default function EditClientModal({ client, onSave, onCancel }: EditClientModalProps) {
  const [formData, setFormData] = useState(client)

  useEffect(() => {
    setFormData(client)
  }, [client])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSave(formData)
    toast({
      title: "Éxito",
      description: "El cliente ha sido actualizado correctamente.",
    })
  }

  return (
    <Dialog open={true} onOpenChange={() => onCancel()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Cliente</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="card_identifi">Identificación</Label>
            <Input id="card_identifi" name="card_identifi" value={formData.card_identifi} onChange={handleChange} required />
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
            <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
            <Button type="submit">Guardar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}