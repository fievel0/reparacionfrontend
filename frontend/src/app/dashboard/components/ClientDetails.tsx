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
import { Client } from '../type/Client'


type ClientDetailsProps = {
  client: Client
  onEdit?: (client: Client) => void
  onDelete?: (id: number) => void
}

export default function ClientDetails({ client, onEdit, onDelete }: ClientDetailsProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/customer/delete/${client.id_customer}`)
      if (response.ok) {
        if (onDelete) {
          onDelete(client.id_customer)
        }
        toast({
          title: "Éxito",
          description: "El cliente ha sido eliminado correctamente.",
        })
      } else {
        toast({
          title: "Error",
          description: "No se pudo eliminar el cliente. Por favor, intente de nuevo.",
          variant: "destructive",
        })
      }
    } catch (error) {
      if (error instanceof Error && error.message === 'Token expired') {
        router.push('/login')
      }
    }
    setIsDeleteDialogOpen(false)
  }

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4 flex justify-between items-center">
      <div>
        <span> {client.id_customer}</span>
        <span className="text-lg font-semibold mb-2">{client.name}</span>
        <span> {client.card_identifi}</span>
        <span> {client.phone}</span>
        <span> {client.mail}</span>
      </div>
      <div className="flex space-x-2">
        {onEdit && (
          <Button onClick={() => onEdit(client)} variant="outline">
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
            <p>¿Está seguro de que desea eliminar este cliente?</p>
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