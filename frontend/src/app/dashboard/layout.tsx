'use client'

import { ReactNode, useState } from 'react'
import DashboardNav from './components/DashboardNav'
import { ModalProvider } from '@/contexts/Modalcontext'
import SearchWorkOrderForm from './components/SearchWorkOrderForm'
import SearchClient from './components/SearchClientModal'
import SearchEmployeeModal from './components/SearchEmployeeModal'
import NewClientModal from './components/NewClientModal'
import ClientList from './components/ClientList'
import { Toaster } from "@/components/ui/toaster"
import NewEmployeeModal from './components/NewEmployeeModal'
import EmployeeList from './components/EmployeeList'
import NewWorkOrderForm from './components/NewWorkOrderForm'
import WorkOrderList from './components/WorkOrderList'
import EquipmentList from './components/EquipmentList'
import EquipmentDetailsModal from './components/EquipmentDetailsModal'

export default function DashboardLayout({ children }: { readonly children: ReactNode }) {
  const [showNewWorkOrder, setShowNewWorkOrder] = useState(false)
  const [showClientList, setShowClientList] = useState(false)
  const [showEmployeeList, setShowEmployeeList] = useState(false)
  const [showSearchClient, setShowSearchClient] = useState(false)
  const [showSearchWorkOrder, setShowSearchWorkOrder] = useState(false)
  const [showWorkOrderList, setShowWorkOrderList] = useState(false)
  const [showEquipmentList, setShowEquipmentList] = useState(false)

  const handleShowClientList = () => {
    setShowClientList(true)
    setShowEmployeeList(false)
    setShowSearchClient(false)
    setShowNewWorkOrder(false)
    setShowSearchWorkOrder(false)
    setShowWorkOrderList(false)
    setShowEquipmentList(false)
  }

  const handleShowEmployeeList = () => {
    setShowEmployeeList(true)
    setShowClientList(false)
    setShowSearchClient(false)
    setShowNewWorkOrder(false)
    setShowSearchWorkOrder(false)
    setShowWorkOrderList(false)
    setShowEquipmentList(false)
  }

  const handleShowSearchClient = () => {
    setShowSearchClient(true)
    setShowClientList(false)
    setShowEmployeeList(false)
    setShowNewWorkOrder(false)
    setShowSearchWorkOrder(false)
    setShowWorkOrderList(false)
    setShowEquipmentList(false)
  }

  const handleShowNewWorkOrder = () => {
    setShowNewWorkOrder(true)
    setShowClientList(false)
    setShowEmployeeList(false)
    setShowSearchClient(false)
    setShowSearchWorkOrder(false)
    setShowWorkOrderList(false)
    setShowEquipmentList(false)
  }

  const handleShowSearchWorkOrder = () => {
    setShowSearchWorkOrder(true)
    setShowNewWorkOrder(false)
    setShowClientList(false)
    setShowEmployeeList(false)
    setShowSearchClient(false)
    setShowWorkOrderList(false)
    setShowEquipmentList(false)
  }

  const handleShowWorkOrderList = () => {
    setShowWorkOrderList(true)
    setShowSearchWorkOrder(false)
    setShowNewWorkOrder(false)
    setShowClientList(false)
    setShowEmployeeList(false)
    setShowSearchClient(false)
    setShowEquipmentList(false)
  }

  const handleShowEquipmentList = () => {
    setShowEquipmentList(true)
    setShowNewWorkOrder(false)
    setShowClientList(false)
    setShowEmployeeList(false)
    setShowSearchClient(false)
    setShowSearchWorkOrder(false)
    setShowWorkOrderList(false)
  }

  return (
    <ModalProvider>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <DashboardNav
          onShowClientList={handleShowClientList}
          onShowEmployeeList={handleShowEmployeeList}
          onShowSearchClient={handleShowSearchClient}
          onShowNewWorkOrder={handleShowNewWorkOrder}
          onShowSearchWorkOrder={handleShowSearchWorkOrder}
          onShowWorkOrderList={handleShowWorkOrderList}
          onShowEquipmentList={handleShowEquipmentList}
        />
        <main className="flex-grow container mx-auto px-4 py-8">
          {showNewWorkOrder ? <NewWorkOrderForm /> : 
           showClientList ? <ClientList /> : 
           showEmployeeList ? <EmployeeList /> : 
           showSearchClient ? <SearchClient /> :
           showSearchWorkOrder ? <SearchWorkOrderForm /> :
           showWorkOrderList ? <WorkOrderList /> :
           showEquipmentList ? <EquipmentList /> :
          
           children}
        </main>
        <NewClientModal />
        <NewEmployeeModal /> 
        <SearchEmployeeModal />
        <EquipmentDetailsModal />
        <Toaster />
      </div>
    </ModalProvider>
  )
}
