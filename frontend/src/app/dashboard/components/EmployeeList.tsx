'use client'

import { useState, useEffect, useCallback } from 'react'
import EmployeeDetails from './EmployeeDetails'
import EditEmployeeModal from './EditEmployeeModal'
import { api } from '@/utils/api'
import { useRouter } from 'next/navigation'
import { Employee } from '../type/Employee'

export default function EmployeeList() {
  const [employees, setEmployees] = useState([])
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
  }, [router]); // Incluye 'router' en las dependencias

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
      } else {
        console.error('Error al eliminar el empleado')
      }
    } catch (error) {
      //console.error('Error:', error)
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
      } else {
        console.error('Error al actualizar el empleado')
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
      <h2 className="text-2xl font-bold mb-4">Lista de Empleados</h2>
      {employees.length > 0 ? (
        employees.map((employee: Employee) => (
          <EmployeeDetails
            key={employee.idEmployee}
            employee={employee}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p>No hay empleados para mostrar.</p>
      )}
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