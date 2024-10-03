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
import { WorkOrder } from '../type/WorkOrder'

type WorkOrderDetailsProps = {
  workOrder: WorkOrder
  onEdit?: (workOrder: WorkOrder) => void
  onDelete?: (id: number) => void
}

export default function WorkOrderDetails({ workOrder, onEdit, onDelete }: WorkOrderDetailsProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/ord_rep/delete/${workOrder.id_order}`)
      if (response.ok) {
        if (onDelete) {
          onDelete(workOrder.id_order)
        }
        toast({
          title: "Éxito",
          description: "La orden de trabajo ha sido eliminada correctamente.",
        })
      } else {
        toast({
          title: "Error",
          description: "No se pudo eliminar la orden de trabajo. Por favor, intente de nuevo.",
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

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold mb-2">Orden de Trabajo #{workOrder.id_order}</h3>
      <p>ID del Cliente: {workOrder.customer.id_customer}</p>
      <p>ID del Empleado: {workOrder.employee.idEmployee}</p>
      <div className="mt-4 space-x-2">
        {onEdit && (
          <Button onClick={() => onEdit(workOrder)} variant="outline">
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
            <p>¿Está seguro de que desea eliminar esta orden de trabajo?</p>
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
        <Button onClick={handlePrint} variant="outline">
          Imprimir
        </Button>
      </div>
    </div>
  )
}