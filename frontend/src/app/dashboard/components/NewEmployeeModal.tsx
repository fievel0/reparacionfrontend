'use client'

import { useState } from 'react'
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

export default function NewEmployeeModal() {
  const { isNewEmployeeOpen, closeAllModals } = useModal()

  const [formData, setFormData] = useState({
    nameEmployee: '',
    positionEmployee: '',
    cedEmployee:'',
    dirEmployee:'',
    telEmployee:'',
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await api.post('/employee/save', { ...formData, id_employee: 0, rep_orderList: [] })
      if (response.ok) {
        closeAllModals()
        toast({
          title: "Éxito",
          description: "El empleado ha sido guardado correctamente.",
        })
        // Aquí puedes agregar lógica adicional después de guardar exitosamente
      } else {
        toast({
          title: "Error",
          description: "No se pudo guardar el empleado. Por favor, intente de nuevo.",
          variant: "destructive",
        })
      }
    } catch (error) {
      //console.error('Error:', error)
      if (error instanceof Error && error.message === 'Token expired') {
        router.push('/login')
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <Dialog open={isNewEmployeeOpen} onOpenChange={closeAllModals}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nuevo Empleado</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" name="nameEmployee" value={formData.nameEmployee} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="positionEmployee">Cargo</Label>
            <Input id="positionEmployee" name="positionEmployee" value={formData.positionEmployee} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="cedEmployee">Identificación</label>
            <Input id="cedEmployee" name="cedEmployee" value={formData.cedEmployee} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="dirEmployee">Dirección</label>
            <Input id="dirEmployee" name="dirEmployee" value={formData.dirEmployee} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="telEmployee">Telefono</label>
            <Input id="telEmployee" name="telEmployee" value={formData.telEmployee} onChange={handleChange} required />
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