import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from 'react'
import { api } from '@/utils/api'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'
import { Employee } from '../type/Employee'

type EmployeeDetailsProps = {
  employee: Employee
  onEdit?: (employee: Employee) => void
  onDelete?: (id: number) => void
}

export default function EmployeeDetails({ employee, onEdit, onDelete }: Readonly<EmployeeDetailsProps>) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/employee/delete/${employee.idEmployee}`)
      if (response.ok) {
        if (onDelete) {
          onDelete(employee.idEmployee)
        }
        toast({
          title: "Éxito",
          description: "El empleado ha sido eliminado correctamente.",
        })
      } else {
        toast({
          title: "Error",
          description: "No se pudo eliminar el empleado. Por favor, intente de nuevo.",
          variant: "destructive",
        })
      }
    } catch (error) {
      //console.error('Error:', error)
      if (error instanceof Error && error.message === 'Token expired') {
        router.push('/login')
      }
    }
    setIsDeleteDialogOpen(false)
  }

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4 flex justify-between items-center">
      <div>
        <span className="text-lg font-semibold mb-2">{employee.nameEmployee}</span>
        <span> -  {employee.positionEmployee}</span>
        <span> -  {employee.dirEmployee}</span>
        <span> -  {employee.telEmployee}</span>
      </div>
      <div className="flex space-x-2">
        {onEdit && (
          <Button onClick={() => onEdit(employee)} variant="outline">
            Editar
          </Button>
        )}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive">Eliminar</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar eliminación</DialogTitle>
            </DialogHeader>
            <p>¿Está seguro de que desea eliminar este empleado?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <Button onClick={() => setIsDeleteDialogOpen(false)} variant="outline">
                Cancelar
              </Button>
              <Button onClick={handleDelete} variant="destructive">
                Eliminar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>  
  )
}