'use client'

import { useState, useEffect, useCallback } from 'react'
import { api } from '@/utils/api'
import { useRouter } from 'next/navigation'
import { Client } from '../type/Client'
import EditClientModal from './EditClientModal'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from '@/hooks/use-toast'

export default function ClientList() {
  const [clients, setClients] = useState<Client[]>([])
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const router = useRouter()

  const fetchClients = useCallback(async () => {
    try {
      const response = await api.get('/customer')
      if (response.ok) {
        const data = await response.json()
        setClients(data)
      } else {
        console.error('Error al obtener la lista de clientes')
      }
    } catch (error) {
      if (error instanceof Error && error.message === 'Token expired') {
        router.push('/login')
      }
    }
  }, [router])

  useEffect(() => {
    fetchClients()
  }, [fetchClients])

  const handleEdit = (client: Client) => {
    setEditingClient(client)
    setIsEditModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await api.delete(`/customer/delete/${id}`)
      if (response.ok) {
        fetchClients()
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
        fetchClients()
        setEditingClient(null)
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
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lista de Clientes</h2>
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
          {clients.map((client) => (
            <TableRow key={client.id_customer}>
              <TableCell>{client.id_customer}</TableCell>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.cardIdentifi}</TableCell>
              <TableCell>{client.phone}</TableCell>
              <TableCell>{client.mail}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(client)} variant="outline" className="mr-2">
                  Editar
                </Button>
                <Button onClick={() => handleDelete(client.id_customer)} variant="destructive">
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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