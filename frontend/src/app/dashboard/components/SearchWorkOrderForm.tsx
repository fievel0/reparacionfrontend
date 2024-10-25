'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { api } from '@/utils/api'
import { useRouter } from 'next/navigation'
import { WorkOrder } from '../type/WorkOrder'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

interface SearchWorkOrderFormProps {
  initialOrderId?: number;
  onCancel?: () => void;
}

export default function SearchWorkOrderForm({ initialOrderId, onCancel }: SearchWorkOrderFormProps) {
  const [searchId, setSearchId] = useState(initialOrderId?.toString() || '')
  const [workOrderData, setWorkOrderData] = useState<WorkOrder | null>(null)
  const [employees, setEmployees] = useState<{ idEmployee: string; nameEmployee: string }[]>([])
  const router = useRouter()

  useEffect(() => {
    fetchEmployees()
    if (initialOrderId) {
      handleSearch()
    }
  }, [initialOrderId])

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/employee/findAll')
      if (response.ok) {
        const data = await response.json()
        setEmployees(data)
      }
    } catch (error) {
      console.error('Error fetching employees:', error)
    }
  }

  const handleSearch = async () => {
    if (!/^\d+$/.test(searchId)) {
      toast({
        title: "Error",
        description: "Por favor, ingrese un ID de orden válido (números solamente).",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await api.get(`/ord_rep/find/${searchId}`)
      if (response.ok) {
        const data = await response.json()
        setWorkOrderData(data)
      } else {
        toast({
          title: "Error",
          description: "Orden de trabajo no encontrada",
          variant: "destructive",
        })
        setWorkOrderData(null)
      }
    } catch (error) {
      if (error instanceof Error && error.message === 'Token expired') {
        router.push('/login')
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (workOrderData) {
      setWorkOrderData(prevData => ({
        ...prevData!,
        [name]: value
      }))
    }
  }

  const handleEquipmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (workOrderData) {
      setWorkOrderData(prevData => ({
        ...prevData!,
        equipment: {
          ...prevData!.equipment,
          [name]: value
        }
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!workOrderData) return

    try {
      const response = await api.put(`/ord_rep/update/${workOrderData.id_order}`, workOrderData)
      if (response.ok) {
        toast({
          title: "Éxito",
          description: "La orden de trabajo ha sido actualizada correctamente.",
        })
      } else {
        toast({
          title: "Error",
          description: "No se pudo actualizar la orden de trabajo. Por favor, intente de nuevo.",
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
    <div className="space-y-4">
      <div className="flex items-end space-x-2">
        <div className="flex-1">
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
        {onCancel && <Button onClick={onCancel} variant="outline">Cancelar</Button>}
      </div>
      {workOrderData && (
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="id_order">Número de Orden</Label>
              <Input id="id_order" value={workOrderData.id_order} readOnly />
            </div>
            <div>
              <Label htmlFor="create_date">Fecha de Creación</Label>
              <Input
                id="create_date"
                name="create_date"
                type="date"
                value={workOrderData.create_date}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="deadline">Fecha Límite</Label>
              <Input
                id="deadline"
                name="deadline"
                type="date"
                value={workOrderData.deadline || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="tot_pay">Pago Total</Label>
              <Input
                id="tot_pay"
                name="tot_pay"
                type="number"
                value={workOrderData.tot_pay}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Datos del Cliente</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customer_name">Nombre</Label>
                <Input id="customer_name" value={workOrderData.customer.name} readOnly />
              </div>
              <div>
                <Label htmlFor="customer_cardIdentifi">Identificación</Label>
                <Input id="customer_cardIdentifi" value={workOrderData.customer.cardIdentifi} readOnly />
              </div>
              <div>
                <Label htmlFor="customer_phone">Teléfono</Label>
                <Input id="customer_phone" value={workOrderData.customer.phone} readOnly />
              </div>
              <div>
                <Label htmlFor="customer_mail">Correo</Label>
                <Input id="customer_mail" value={workOrderData.customer.mail} readOnly />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Detalles del Equipo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="model_equip">Modelo</Label>
                <Input
                  id="model_equip"
                  name="model_equip"
                  value={workOrderData.equipment.model_equip}
                  onChange={handleEquipmentChange}
                />
              </div>
              <div>
                <Label htmlFor="brand_equip">Marca</Label>
                <Input
                  id="brand_equip"
                  name="brand_equip"
                  value={workOrderData.equipment.brand_equip}
                  onChange={handleEquipmentChange}
                />
              </div>
              <div>
                <Label htmlFor="color_equip">Color</Label>
                <Input
                  id="color_equip"
                  name="color_equip"
                  value={workOrderData.equipment.color_equip}
                  onChange={handleEquipmentChange}
                />
              </div>
              <div>
                <Label htmlFor="state_equip">Estado</Label>
                <Input
                  id="state_equip"
                  name="state_equip"
                  value={workOrderData.equipment.state_equip}
                  onChange={handleEquipmentChange}
                />
              </div>
              <div>
                <Label htmlFor="pass_equip">Contraseña</Label>
                <Input
                  id="pass_equip"
                  name="pass_equip"
                  value={workOrderData.equipment.pass_equip}
                  onChange={handleEquipmentChange}
                />
              </div>
              <div>
                <Label htmlFor="anti_equip">Antigüedad</Label>
                <Input
                  id="anti_equip"
                  name="anti_equip"
                  value={workOrderData.equipment.anti_equip}
                  onChange={handleEquipmentChange}
                />
              </div>
              <div>
                <Label htmlFor="accessor_equip">Accesorios</Label>
                <Input
                  id="accessor_equip"
                  name="accessor_equip"
                  value={workOrderData.equipment.accessor_equip}
                  onChange={handleEquipmentChange}
                />
              </div>
              <div>
                <Label htmlFor="reported_equip">Reportado</Label>
                <Input
                  id="reported_equip"
                  name="reported_equip"
                  value={workOrderData.equipment.reported_equip}
                  onChange={handleEquipmentChange}
                />
              </div>
              <div>
                <Label htmlFor="detail_phy_equip">Detalle Físico</Label>
                <Input
                  id="detail_phy_equip"
                  name="detail_phy_equip"
                  value={workOrderData.equipment.detail_phy_equip}
                  onChange={handleEquipmentChange}
                />
              </div>
              <div>
                <Label htmlFor="temp_equip">Temperatura</Label>
                <Input
                  id="temp_equip"
                  name="temp_equip"
                  value={workOrderData.equipment.temp_equip}
                  onChange={handleEquipmentChange}
                />
              </div>
              <div>
                <Label htmlFor="on_off_equip">Encendido/Apagado</Label>
                <Select
                  name="on_off_equip"
                  value={workOrderData.equipment.on_off_equip ? "true" : "false"}
                  onValueChange={(value) => handleEquipmentChange({ target: { name: 'on_off_equip', value: value === "true" } } as React.ChangeEvent<HTMLInputElement>)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Sí</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="cau_dam_equip">Causa del Daño</Label>
                <Input
                  id="cau_dam_equip"
                  name="cau_dam_equip"
                  value={workOrderData.equipment.cau_dam_equip}
                  onChange={handleEquipmentChange}
                />
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="employee">Empleado</Label>
            <Input id="employee" value={workOrderData.employee.nameEmployee} readOnly />
          </div>
          
          <div>
            <Label htmlFor="addit_details">Detalles Adicionales</Label>
            <Textarea
              id="addit_details"
              name="addit_details"
              value={workOrderData.addit_details}
              onChange={handleChange}
              className="h-24"
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="submit">Actualizar</Button>
          </div>
        </form>
      )}
    </div>
  )
}
