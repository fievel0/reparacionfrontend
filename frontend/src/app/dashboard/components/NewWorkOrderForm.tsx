'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { api } from '@/utils/api'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'
import NewClientModal from './NewClientModal'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Order {
  id_order: number;
}

export default function NewWorkOrderForm() {
  const [formData, setFormData] = useState({
    create_date: new Date().toISOString().split('T')[0],
    deadline: '',
    tot_pay: 0,
    addit_details: '',
    customer: { id_customer: '' },
    equipment: {
      model_equip: '',
      brand_equip: '',
      color_equip: '',
      state_equip: '',
      pass_equip: '',
      anti_equip: '',
      accessor_equip: '',
      reported_equip: '',
      detail_phy_equip: '',
      temp_equip: '',
      on_off_equip: false,
      cau_dam_equip: ''
    },
    employee: { idEmployee: '' }
  })
  const [clientData, setClientData] = useState(null)
  const [showNewClientModal, setShowNewClientModal] = useState(false)
  const [employees, setEmployees] = useState([])
  const [nextOrderNumber, setNextOrderNumber] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchNextOrderNumber()
    fetchEmployees()
  }, [])

  const fetchNextOrderNumber = async () => {
    try {
      const response = await api.get('/ord_rep/findAll')
      if (response.ok) {
        const data: Order[] = await response.json()
        const maxOrderNumber = Math.max(...data.map((order: Order) => order.id_order), 0)
        setNextOrderNumber(maxOrderNumber + 1)
      }
    } catch (error) {
      console.error('Error fetching next order number:', error)
    }
  }

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleEquipmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      equipment: {
        ...prevData.equipment,
        [name]: value
      }
    }))
  }

  const handleCustomerSearch = async () => {
    try {
      const response = await api.get(`/customer/find/${formData.customer.id_customer}`)
      if (response.ok) {
        const data = await response.json()
        setClientData(data)
      } else {
        setShowNewClientModal(true)
      }
    } catch (error) {
      console.error('Error searching for customer:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      // Save equipment first
      const equipmentResponse = await api.post('/equipment/save', formData.equipment)
      if (equipmentResponse.ok) {
        const equipmentData = await equipmentResponse.json()
        
        // Now save the work order
        const workOrderData = {
          ...formData,
          equipment: { id_equip: equipmentData.id_equip }
        }
        const workOrderResponse = await api.post('/ord_rep/save', workOrderData)
        if (workOrderResponse.ok) {
          toast({
            title: "Éxito",
            description: "La orden de trabajo ha sido guardada correctamente.",
          })
          router.push('/dashboard/work-orders')
        } else {
          throw new Error('Error al guardar la orden de trabajo')
        }
      } else {
        throw new Error('Failed to save equipment')
      }
    } catch (error) {
      console.error('Error saving work order:', error)
      toast({
        title: "Error",
        description: "No se pudo guardar la orden de trabajo. Por favor, intente de nuevo.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-700">ORDEN DE TRABAJO</h1>
        <div>N° {nextOrderNumber}</div>
      </div>
      
      <section>
        <h2 className="text-lg font-semibold mb-2 text-gray-600">DATOS CLIENTE</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="customer_id">ID Cliente</Label>
            <div className="flex">
              <Input
                id="customer_id"
                name="customer.id_customer"
                value={formData.customer.id_customer}
                onChange={handleChange}
              />
              <Button type="button" onClick={handleCustomerSearch}>Buscar</Button>
            </div>
          </div>
          {clientData && (
            <>
              <div>
                <Label htmlFor="nombre">NOMBRE</Label>
                <Input id="nombre" value={clientData?.name || ''} readOnly />
              </div>
              <div>
                <Label htmlFor="direccion">DIRECCIÓN</Label>
                <Input id="direccion" value={clientData.address || ''} readOnly />
              </div>
              <div>
                <Label htmlFor="cedula">CEDULA</Label>
                <Input id="cedula" value={clientData.card_identifi} readOnly />
              </div>
              <div>
                <Label htmlFor="telefono">TELEFONO</Label>
                <Input id="telefono" value={clientData.phone} readOnly />
              </div>
            </>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2 text-gray-600">DETALLES DEL DISPOSITIVO</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="model_equip">MODELO</Label>
            <Input id="model_equip" name="model_equip" value={formData.equipment.model_equip} onChange={handleEquipmentChange} />
          </div>
          <div>
            <Label htmlFor="brand_equip">MARCA</Label>
            <Input id="brand_equip" name="brand_equip" value={formData.equipment.brand_equip} onChange={handleEquipmentChange} />
          </div>
          <div>
            <Label htmlFor="color_equip">COLOR</Label>
            <Input id="color_equip" name="color_equip" value={formData.equipment.color_equip} onChange={handleEquipmentChange} />
          </div>
          <div>
            <Label htmlFor="state_equip">ESTADO DEL DISPOSITIVO</Label>
            <Input id="state_equip" name="state_equip" value={formData.equipment.state_equip} onChange={handleEquipmentChange} placeholder="ENCENDIDO / APAGADO/ SE CALIENTA" />
          </div>
          <div>
            <Label htmlFor="pass_equip">CONTRASEÑA</Label>
            <Input id="pass_equip" name="pass_equip" value={formData.equipment.pass_equip} onChange={handleEquipmentChange} />
          </div>
          <div>
            <Label htmlFor="anti_equip">ANTIGÜEDAD</Label>
            <Input id="anti_equip" name="anti_equip" value={formData.equipment.anti_equip} onChange={handleEquipmentChange} />
          </div>
          <div>
            <Label htmlFor="accessor_equip">ACCESORIOS</Label>
            <Input id="accessor_equip" name="accessor_equip" value={formData.equipment.accessor_equip} onChange={handleEquipmentChange} />
          </div>
          <div>
            <Label htmlFor="reported_equip">REPORTADO</Label>
            <Input id="reported_equip" name="reported_equip" value={formData.equipment.reported_equip} onChange={handleEquipmentChange} />
          </div>
          <div>
            <Label htmlFor="detail_phy_equip">DETALLE-DAÑO FÍSICO</Label>
            <Input id="detail_phy_equip" name="detail_phy_equip" value={formData.equipment.detail_phy_equip} onChange={handleEquipmentChange} />
          </div>
          <div>
            <Label htmlFor="temp_equip">TEMPERATURA</Label>
            <Input id="temp_equip" name="temp_equip" value={formData.equipment.temp_equip} onChange={handleEquipmentChange} />
          </div>
          <div>
            <Label htmlFor="on_off_equip">ENCENDIDO/APAGADO</Label>
            <Select
              name="on_off_equip"
              value={formData.equipment.on_off_equip.toString()}
              onValueChange={(value) => handleEquipmentChange({ target: { name: 'on_off_equip', value: value === 'true' } })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Encendido</SelectItem>
                <SelectItem value="false">Apagado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="cau_dam_equip">CAUSA DEL DAÑO</Label>
            <Input id="cau_dam_equip" name="cau_dam_equip" value={formData.equipment.cau_dam_equip} onChange={handleEquipmentChange} />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2 text-gray-600">ORDEN EMITIDA POR</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="employee">EMPLEADO</Label>
            <Select
              name="employee.idEmployee"
              value={formData.employee.idEmployee}
              onValueChange={(value) => setFormData(prevData => ({ ...prevData, employee: { idEmployee: value } }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un empleado" />
              </SelectTrigger>
              <SelectContent>
                {employees.map((employee) => (
                  <SelectItem key={employee.idEmployee} value={employee.idEmployee.toString()}>
                    {employee.nameEmployee}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="create_date">FECHA</Label>
            <Input id="create_date" name="create_date" type="date" value={formData.create_date} onChange={handleChange} />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2 text-gray-600">DETALLES ADICIONALES</h2>
        <Textarea
          name="addit_details"
          value={formData.addit_details}
          onChange={handleChange}
          className="w-full h-24"
        />
      </section>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => router.push('/dashboard/work-orders')}>Cancelar</Button>
        <Button type="submit">Guardar</Button>
      </div>

      {showNewClientModal && (
        <NewClientModal
          onSave={(newClient) => {
            setClientData(newClient)
            setShowNewClientModal(false)
            setFormData(prevData => ({
              ...prevData,
              customer: { id_customer: newClient.id_customer }
            }))
          }}
          onCancel={() => setShowNewClientModal(false)}
        />
      )}
    </form>
  )
}