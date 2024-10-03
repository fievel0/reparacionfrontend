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
import WorkOrderDetails from './WorkOrderDetails'
import { useModal } from '@/contexts/Modalcontext'

export default function SearchWorkOrderModal() {
  const { isSearchWorkOrderOpen, closeAllModals } = useModal()
  const [searchId, setSearchId] = useState('')
  const [workOrderData, setWorkOrderData] = useState(null)
  const router = useRouter()

  const handleSearch = async () => {
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
      //console.error('Error:', error)
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
            <Input id="searchId" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
          </div>
          <Button onClick={handleSearch}>Buscar</Button>
          {workOrderData && <WorkOrderDetails workOrder={workOrderData} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}