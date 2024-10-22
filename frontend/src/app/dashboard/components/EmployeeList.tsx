'use client'

import { useState, useEffect, useCallback } from 'react'
//import EmployeeDetails from './EmployeeDetails'
import EditEmployeeModal from './EditEmployeeModal'
import { api } from '@/utils/api'
import { useRouter } from 'next/navigation'
import { Employee } from '../type/Employee'
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

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const router = useRouter()

  const fetchEmployees = useCallback(async () => {
    try {
      const response = await api.get('/employee/findAll')
      if (response.ok) {
        const data = await response.json()
        console.log('Empleados obtenidos:', data)
        setEmployees(data)
      } else {
        console.error('Error al obtener la lista de empleados')
      }
    } catch (error) {
      if (error instanceof Error && error.message === 'Token expired') {
        router.push('/login')
      }
    }
  }, [router]);

  useEffect(() => {
    fetchEmployees()
  }, [fetchEmployees])

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee)
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await api.delete(`/employee/delete/${id}`)
      if (response.ok) {
        fetchEmployees()
        toast({
          title: "Éxito",
          description: "El empleado ha sido eliminado correctamente.",
        })
      } else {
        console.error('Error al eliminar el empleado')
      }
    } catch (error) {
      if (error instanceof Error && error.message === 'Token expired') {
        router.push('/login')
      }
    }
  }

  const handleUpdate = async (updatedEmployee: Employee) => {
    try {
      const response = await api.put(`/employee/update/${updatedEmployee.idEmployee}`, updatedEmployee as unknown as Record<string, unknown>)
      if (response.ok) {
        fetchEmployees()
        setEditingEmployee(null)
        toast({
          title: "Éxito",
          description: "El empleado ha sido actualizado correctamente.",
        })
      } else {
        console.error('Error al actualizar el empleado')
      }
    } catch (error) {
      if (error instanceof Error && error.message === 'Token expired') {
        router.push('/login')
      }
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lista de Empleados</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Cargo</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Dirección</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.idEmployee}>
              <TableCell>{employee.idEmployee}</TableCell>
              <TableCell>{employee.nameEmployee}</TableCell>
              <TableCell>{employee.positionEmployee}</TableCell>
              <TableCell>{employee.telEmployee}</TableCell>
              <TableCell>{employee.dirEmployee}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(employee)} variant="outline" className="mr-2">
                  Editar
                </Button>
                <Button onClick={() => handleDelete(employee.idEmployee)} variant="destructive">
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {editingEmployee && (
        <EditEmployeeModal
          employee={editingEmployee}
          onSave={handleUpdate}
          onCancel={() => setEditingEmployee(null)}
        />
      )}
    </div>
  )
}
