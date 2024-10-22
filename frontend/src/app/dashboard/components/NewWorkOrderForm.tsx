'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { api } from '@/utils/api'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

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
      cau_dam_equip: '',
      id_customer: ''
    },
    employee: { idEmployee: '' }
  })
  const [clientData, setClientData] = useState<{ name?: string; cardIdentifi?: string; phone?: string; mail?: string } | null>(null)
  const [employees, setEmployees] = useState<{ idEmployee: string; nameEmployee: string }[]>([]);
  const [nextOrderNumber, setNextOrderNumber] = useState<number | null>(null)
  const router = useRouter()
  const [cardIdentifi, setCardIdentifi] = useState<string>('')
  //const [isClientSelected, setIsClientSelected] = useState(false)

  useEffect(() => {
    fetchNextOrderNumber()
    fetchEmployees()
  }, [])

  const fetchNextOrderNumber = async () => {
    try {
      const response = await api.get('/ord_rep/findLast');
      if (response.ok) {
        const data = await response.json();
        const nextOrderNumber = data.id_order + 1;
        setNextOrderNumber(nextOrderNumber);
      } else if (response.status === 404) {
        setNextOrderNumber(1);
      }
    } catch (error) {
      console.error('Error fetching next order number:', error);
      setNextOrderNumber(1);
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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;

    // Verifica si el campo pertenece a equipment
    if (name in formData.equipment) {
      setFormData(prevData => ({
        ...prevData,
        equipment: {
          ...prevData.equipment,
          [name]: value
        }
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleCustomerSearch = async () => {
    try {
      const response = await api.get(`/customer/cedula/${cardIdentifi}`);
      if (response.ok) {
        const data = await response.json();
        setClientData(data);
        setFormData(prevData => ({
          ...prevData,
          customer: { id_customer: data.id_customer }
        }));
        //setIsClientSelected(true);
      } else {
        toast({
          title: "Cliente no encontrado",
          description: "Si desea agregar un nuevo cliente, utilice el menú Clientes -> Nuevo Cliente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error searching for customer:', error);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        // Guardar el equipo
        const equipmentResponse = await api.post('/equipment/save', {
            model_equip: formData.equipment.model_equip,
            brand_equip: formData.equipment.brand_equip,
            color_equip: formData.equipment.color_equip,
            state_equip: formData.equipment.state_equip,
            pass_equip: formData.equipment.pass_equip,
            anti_equip: formData.equipment.anti_equip,
            accessor_equip: formData.equipment.accessor_equip,
            reported_equip: formData.equipment.reported_equip,
            detail_phy_equip: formData.equipment.detail_phy_equip,
            temp_equip: formData.equipment.temp_equip,
            on_off_equip: formData.equipment.on_off_equip,
            cau_dam_equip: formData.equipment.cau_dam_equip,
            id_customer: formData.customer.id_customer
        });

        if (!equipmentResponse.ok) {
            throw new Error('Error al guardar el equipo');
        }

        const equipmentData = await equipmentResponse.json();
        const id_equip = equipmentData.id; // Asignar el id del equipo guardado

        // Guardar la orden de trabajo
        const orderResponse = await api.post('/ord_rep/save', {
            create_date: formData.create_date,
            deadline: formData.deadline,
            tot_pay: formData.tot_pay,
            addit_details: formData.addit_details,
            customer: { id_customer: formData.customer.id_customer },
            equipment: { id_equip: id_equip },
            employee: { idEmployee: formData.employee.idEmployee }
        });

        if (!orderResponse.ok) {
            throw new Error('Error al guardar la orden de trabajo');
        }

        toast({
            title: "Éxito",
            description: "La operación fue exitosa.",
        });

    } catch (error) {
        console.error('Error:', error);
        toast({
            title: "Error",
            description: "No se pudo guardar la orden de trabajo. Por favor, intente de nuevo.",
            variant: "destructive",
        });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-700">ORDEN DE TRABAJO N° {nextOrderNumber}</h1>
      </div>
      
      <section>
        <h2 className="text-lg font-semibold mb-2 text-gray-600">DATOS CLIENTE</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="customer_id">Identificación Cliente</Label>
            <div className="flex">
              <Input
                id="customer_id"
                name="customer.id_customer"
                value={cardIdentifi}
                onChange={(e) => setCardIdentifi(e.target.value)}
              />
              <Button type="button" onClick={handleCustomerSearch} className='ml-2'>Buscar</Button>
            </div>
          </div>
          {clientData && (
            <>
              <div>
                <Label htmlFor="nombre">NOMBRE</Label>
                <Input id="nombre" value={clientData?.name ?? ''} readOnly />
              </div>
              <div>
                <Label htmlFor="cedula">IDENTIFICACION</Label>
                <Input id="cedula" value={clientData.cardIdentifi} readOnly />
              </div>
              <div>
                <Label htmlFor="telefono">TELEFONO</Label>
                <Input id="telefono" value={clientData.phone} readOnly />
              </div>
              <div>
                <Label htmlFor="email">EMAIL</Label>
                <Input id="email" value={clientData.mail} readOnly />
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
            <Input
              id="model_equip"
              name="model_equip"
              value={formData.equipment.model_equip}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="brand_equip">MARCA</Label>
            <Input
              id="brand_equip"
              name="brand_equip"
              value={formData.equipment.brand_equip}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="color_equip">COLOR</Label>
            <Input
              id="color_equip"
              name="color_equip"
              value={formData.equipment.color_equip}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="state_equip">ESTADO</Label>
            <Input
              id="state_equip"
              name="state_equip"
              value={formData.equipment.state_equip}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="pass_equip">CONTRASEÑA</Label>
            <Input
              id="pass_equip"
              name="pass_equip"
              value={formData.equipment.pass_equip}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="anti_equip">ANTIGÜEDAD</Label>
            <Input
              id="anti_equip"
              name="anti_equip"
              value={formData.equipment.anti_equip}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="accessor_equip">ACCESORIOS</Label>
            <Input
              id="accessor_equip"
              name="accessor_equip"
              value={formData.equipment.accessor_equip}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="reported_equip">REPORTADO</Label>
            <Input
              id="reported_equip"
              name="reported_equip"
              value={formData.equipment.reported_equip}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="detail_phy_equip">DETALLE DAÑO FÍSICO</Label>
            <Input
              id="detail_phy_equip"
              name="detail_phy_equip"
              value={formData.equipment.detail_phy_equip}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="temp_equip">TEMPERATURA</Label>
            <Input
              id="temp_equip"
              name="temp_equip"
              value={formData.equipment.temp_equip}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="on_off_equip">ENCENDIDO/APAGADO</Label>
            <Select
              name="on_off_equip"
              value={formData.equipment.on_off_equip ? "si" : "no"}
              onValueChange={(value) => setFormData(prevData => ({ ...prevData, equipment: { ...prevData.equipment, on_off_equip: value === "si" } }))}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="si">Sí</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="cau_dam_equip">CAUSA DEL DAÑO</Label>
            <Input
              id="cau_dam_equip"
              name="cau_dam_equip"
              value={formData.equipment.cau_dam_equip}
              onChange={handleChange}
            />
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
    </form>
  )
}
