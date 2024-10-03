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
import EmployeeDetails from './EmployeeDetails'
import { api } from '@/utils/api'
import { useRouter } from 'next/navigation'
import { useModal } from '@/contexts/Modalcontext'
export default function SearchEmployeeModal() {
  const { isSearchEmployeeOpen, closeAllModals } = useModal()
  const [searchId, setSearchId] = useState('')
  const [employeeData, setEmployeeData] = useState(null)
  const router = useRouter()

  const handleSearch = async () => {
    try {
      const response = await api.get(`/employee/find/${searchId}`)
      if (response.ok) {
        const data = await response.json()
        setEmployeeData(data)
      } else {
        console.error('Empleado no encontrado')
        setEmployeeData(null)
      }
    } catch (error) {
      //console.error('Error:', error)
      if (error instanceof Error && error.message === 'Token expired') {
        router.push('/login')
      }
    }
  }

  return (
    <Dialog open={isSearchEmployeeOpen} onOpenChange={closeAllModals}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Buscar Empleado</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="searchId">ID del Empleado</Label>
            <Input id="searchId" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
          </div>
          <Button onClick={handleSearch}>Buscar</Button>
          {employeeData && <EmployeeDetails employee={employeeData} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}