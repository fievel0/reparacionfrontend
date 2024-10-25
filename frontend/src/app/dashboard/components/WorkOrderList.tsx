'use client'

import { useState, useEffect, useCallback } from 'react'
import { api } from '@/utils/api'
import { useRouter } from 'next/navigation'
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
import SearchWorkOrderForm from './SearchWorkOrderForm'

interface WorkOrder {
  id_order: number
  create_date: string
  customer: {
    name: string
  }
  equipment: {
    model_equip: string
  }
  employee: {
    nameEmployee: string
  }
}

export default function WorkOrderList() {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([])
  const [editingOrderId, setEditingOrderId] = useState<number | null>(null)
  const router = useRouter()

  const fetchWorkOrders = useCallback(async () => {
    try {
      const response = await api.get('/ord_rep/findAll')
      if (response.ok) {
        const data = await response.json()
        setWorkOrders(data)
      } else {
        console.error('Error al obtener la lista de órdenes de trabajo')
      }
    } catch (error) {
      if (error instanceof Error && error.message === 'Token expired') {
        router.push('/login')
      }
    }
  }, [router])

  useEffect(() => {
    fetchWorkOrders()
  }, [fetchWorkOrders])

  const handleEdit = (id: number) => {
    setEditingOrderId(id)
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await api.delete(`/ord_rep/delete/${id}`)
      if (response.ok) {
        fetchWorkOrders()
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
      if (error instanceof Error && error.message === 'Token expired') {
        router.push('/login')
      }
    }
  }

  if (editingOrderId) {
    return <SearchWorkOrderForm initialOrderId={editingOrderId} onCancel={() => setEditingOrderId(null)} />
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lista de Órdenes de Trabajo</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Fecha de Creación</TableHead>
            <TableHead>Modelo del Equipo</TableHead>
            <TableHead>Empleado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workOrders.map((workOrder) => (
            <TableRow key={workOrder.id_order}>
              <TableCell>{workOrder.id_order}</TableCell>
              <TableCell>{workOrder.customer.name}</TableCell>
              <TableCell>{workOrder.create_date}</TableCell>
              <TableCell>{workOrder.equipment.model_equip}</TableCell>
              <TableCell>{workOrder.employee.nameEmployee}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(workOrder.id_order)} variant="outline" className="mr-2">
                  Editar
                </Button>
                <Button onClick={() => handleDelete(workOrder.id_order)} variant="destructive">
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
