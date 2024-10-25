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
import EquipmentDetailsModal from './EquipmentDetailsModal'

interface Equipment {
  id_equip: number
  model_equip: string
  brand_equip: string
  color_equip: string
  state_equip: string
  pass_equip: string
  anti_equip: string
  accessor_equip: string
  reported_equip: string
  detail_phy_equip: string
  temp_equip: string
  on_off_equip: boolean
  cau_dam_equip: string
  id_customer: number
  name: string
}

export default function EquipList() {
  const [equipments, setEquipments] = useState<Equipment[]>([])
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null)
  const router = useRouter()

  const fetchEquipments = useCallback(async () => {
    try {
      const response = await api.get('/equipment/findAll')
      if (response.ok) {
        const data = await response.json()
        setEquipments(data)
      } else {
        console.error('Error al obtener la lista de equipos')
      }
    } catch (error) {
      if (error instanceof Error && error.message === 'Token expired') {
        router.push('/login')
      }
    }
  }, [router])

  useEffect(() => {
    fetchEquipments()
  }, [fetchEquipments])

  const handleShowDetails = (equipment: Equipment) => {
    setSelectedEquipment(equipment)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lista de Equipos en Reparación</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Modelo</TableHead>
            <TableHead>Marca</TableHead>
            <TableHead>Propietario</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {equipments.map((equipment) => (
            <TableRow key={equipment.id_equip}>
              <TableCell>{equipment.id_equip}</TableCell>
              <TableCell>{equipment.model_equip}</TableCell>
              <TableCell>{equipment.brand_equip}</TableCell>
              <TableCell>{equipment.name}</TableCell>
              <TableCell>
                <Button onClick={() => handleShowDetails(equipment)} variant="outline">
                  Detalles
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedEquipment && (
        <EquipmentDetailsModal
          equipment={selectedEquipment}
          onClose={() => setSelectedEquipment(null)}
        />
      )}
    </div>
  )
}
