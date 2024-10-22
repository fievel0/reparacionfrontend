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
import { WorkOrder } from '../type/WorkOrder'
import { useModal } from '@/contexts/Modalcontext'

export default function SearchWorkOrderModal() {
  const { isSearchWorkOrderOpen, closeAllModals } = useModal()
  const [searchId, setSearchId] = useState('')
  const [workOrderData, setWorkOrderData] = useState<WorkOrder | null>(null)
  const router = useRouter()

  const handleSearch = async () => {
    if (!/^\d+$/.test(searchId)) {
      console.error('Por favor, ingrese un ID de orden válido (números solamente).')
      return
    }

    try {
      const response = await api.get(`/ord_rep/find/${searchId}`)
      if (response.ok) {
        const data = await response.json()
        setWorkOrderData(data)
      } else {
        console.error('Orden de trabajo no encontrada')
        setWorkOrderData(null)
      }
    } catch (error) {
      if (error instanceof Error && error.message === 'Token expired') {
        router.push('/login')
      }
    }
  }

  return (
    <Dialog open={isSearchWorkOrderOpen} onOpenChange={closeAllModals}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Buscar Orden de Trabajo</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="searchId">ID de la Orden de Trabajo</Label>
            <Input
              id="searchId"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              type="number"
              placeholder="Ingrese solo números"
            />
          </div>
          <Button onClick={handleSearch}>Buscar</Button>
          {workOrderData && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Detalles de la Orden de Trabajo</h2>
              <p>ID de la Orden: {workOrderData.id_order}</p>
              <p>Fecha de Creación: {workOrderData.create_date}</p>
              <p>Detalles Adicionales: {workOrderData.addit_details}</p>
              <h3 className="font-semibold">Cliente</h3>
              <p>Nombre: {workOrderData.customer.name}</p>
              <p>Identificación: {workOrderData.customer.cardIdentifi}</p>
              <p>Teléfono: {workOrderData.customer.phone}</p>
              <p>Correo: {workOrderData.customer.mail}</p>
              <h3 className="font-semibold">Equipo</h3>
              <p>Modelo: {workOrderData.equipment.model_equip}</p>
              <p>Marca: {workOrderData.equipment.brand_equip}</p>
              <p>Color: {workOrderData.equipment.color_equip}</p>
              <p>Estado: {workOrderData.equipment.state_equip}</p>
              <p>Detalles Físicos: {workOrderData.equipment.detail_phy_equip}</p>
              <h3 className="font-semibold">Empleado</h3>
              <p>Nombre: {workOrderData.employee.nameEmployee}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
