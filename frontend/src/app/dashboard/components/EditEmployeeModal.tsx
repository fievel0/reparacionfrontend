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
import { toast } from '@/hooks/use-toast'
import { Employee } from '../type/Employee'

export default function EditEmployeeModal({ employee, onSave, onCancel }: {
  readonly employee: Employee;
  readonly onSave: (employee: Employee) => void;
  readonly onCancel: () => void;
  }) {
  const [formData, setFormData] = useState<Employee>(employee);

  useEffect(() => {
    setFormData(employee)
  }, [employee])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSave(formData)
    toast({
      title: "Éxito",
      description: "El empleado ha sido actualizado correctamente.",
    })
  }

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Empleado</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre</Label>
            <Input 
              id="name" 
              name="name" 
              value={formData.nameEmployee} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div>
            <Label htmlFor="position">Cargo</Label>
            <Input
              id="position"
              name="position"
              value={formData.positionEmployee}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="cedEmployee">Identificación</Label>
            <Input
              id="cedEmployee"
              name="cedEmployee"
              value={formData.cedEmployee}
              onChange={handleChange}
              required
            />
            </div>
            <div>
            <Label htmlFor="dirEmployee">Dirección</Label>
            <Input
              id="dirEmployee"
              name="dirEmployee"
              value={formData.dirEmployee}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="telEmployee">Telefono</Label>
            <Input
              id="telEmployee"
              name="telEmployee"
              value={formData.telEmployee}
              onChange={handleChange}
              required
            />
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