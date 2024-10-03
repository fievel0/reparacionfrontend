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
  employee: Employee;
  onSave: (employee: Employee) => void;
  onCancel: () => void;
  }) {
  const [formData, setFormData] = useState<Employee>(employee);

  useEffect(() => {
    setFormData(employee)
  }, [employee])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name === 'name' ? 'nameEmployee' : 'positionEmployee']: value
    }));
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
              value={formData.nameEmployee as string} 
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
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
            <Button type="submit">Guardar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}