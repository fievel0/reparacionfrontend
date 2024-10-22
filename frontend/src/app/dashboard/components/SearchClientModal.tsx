'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api } from '@/utils/api'
import { useRouter } from 'next/navigation'
//import { useModal } from '@/contexts/Modalcontext'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"
import { Client } from '../type/Client'
import EditClientModal from './EditClientModal'

export default function SearchClient() {
  //const { closeAllModals } = useModal()
  const [cardIdentifi, setCardIdentifi] = useState<string>('')
  const [clientData, setClientData] = useState<Client | null>(null)
  const router = useRouter()
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleSearch = async () => {
    try {
      const response = await api.get(`/customer/cedula/${cardIdentifi}`)
      if (response.ok) {
        const data = await response.json()
        setClientData(data)
      } else {
        console.error('Cliente no encontrado')
        setClientData(null)
        toast({
          title: "Error",
          description: "Cliente no encontrado",
          variant: "destructive",
        })
      }
    } catch (error) {
      if (error instanceof Error && error.message === 'Token expired') {
        router.push('/login')
      }
    }
  }

  const handleEdit = (client: Client) => {
    setEditingClient(client)
    setIsEditModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await api.delete(`/customer/delete/${id}`)
      if (response.ok) {
        setClientData(null)
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
  }

  const handleUpdate = async (updatedClient: Client) => {
    try {
      const response = await api.put(`/customer/update/${updatedClient.id_customer}`, updatedClient as unknown as Record<string, unknown>)
      if (response.ok) {
        setClientData(updatedClient)
        setEditingClient(null)
        setIsEditModalOpen(false)
        toast({
          title: "Éxito",
          description: "El cliente ha sido actualizado correctamente.",
        })
      } else {
        toast({
          title: "Error",
          description: "No se pudo actualizar el cliente. Por favor, intente de nuevo.",
          variant: "destructive",
        })
      }
    } catch (error) {
      if (error instanceof Error && error.message === 'Token expired') {
        router.push('/login')
      }
      toast({
        title: "Error",
        description: "Ocurrió un error al actualizar el cliente.",
        variant: "destructive",
      })
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-end space-x-2">
        <div className="flex-1">
          <Label htmlFor="cardIdentifi">Identificación del Cliente</Label>
          <Input id="cardIdentifi" value={cardIdentifi} onChange={(e) => setCardIdentifi(e.target.value)} />
        </div>
        <Button onClick={handleSearch}>Buscar</Button>
      </div>
      {clientData && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Identificación</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Correo</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{clientData.id_customer}</TableCell>
              <TableCell>{clientData.name}</TableCell>
              <TableCell>{clientData.cardIdentifi}</TableCell>
              <TableCell>{clientData.phone}</TableCell>
              <TableCell>{clientData.mail}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(clientData)} variant="outline" className="mr-2">
                  Editar
                </Button>
                <Button onClick={() => handleDelete(clientData.id_customer)} variant="destructive">
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
      {editingClient && isEditModalOpen && (
          <EditClientModal
            client={editingClient}
            onSave={handleUpdate}
            onCancel={() => {
              setIsEditModalOpen(false)
              setEditingClient(null)
            }}
          />
        )}
    </div>
  )
}