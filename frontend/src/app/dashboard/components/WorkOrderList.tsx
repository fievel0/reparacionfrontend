'use client'

import { useState, useEffect, useCallback } from 'react'
import WorkOrderDetails from './WorkOrderDetails'
import { api } from '@/utils/api'
import { useRouter } from 'next/navigation'


export default function WorkOrderList() {
  const [workOrders, setWorkOrders] = useState([])
  const router = useRouter()

  const fetchWorkOrders = useCallback(async () => {
    try {
      const response = await api.get('/ord_rep')
      if (response.ok) {
        const data = await response.json()
        setWorkOrders(data)
      } else {
        console.error('Error al obtener la lista de órdenes de trabajo')
      }
    } catch (error) {
      //console.error('Error:', error)
      if (error instanceof Error && error.message === 'Token expired') {
        router.push('/login')
      }
    }
  }, [router])

  useEffect(() => {
    fetchWorkOrders()
  }, [fetchWorkOrders])

  const handleDelete = async (id: number) => {
    try {
      const response = await api.delete(`/ord_rep/delete/${id}`)
      if (response.ok) {
        fetchWorkOrders()
      } else {
        console.error('Error al eliminar la orden de trabajo')
      }
    } catch (error) {
      //console.error('Error:', error)
      if (error instanceof Error && error.message === 'Token expired') {
        router.push('/login')
      }
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lista de Órdenes de Trabajo</h2>
      {workOrders.map((workOrder) => (
        <WorkOrderDetails
          key={(workOrder as { id_order: string }).id_order}
          workOrder={workOrder}
          onDelete={handleDelete}
        />
      ))}
    </div>
  )
}