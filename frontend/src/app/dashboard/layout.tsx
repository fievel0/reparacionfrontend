'use client'

import { ReactNode, useState } from 'react'
import DashboardNav from './components/DashboardNav'
import { ModalProvider } from '@/contexts/Modalcontext'
import SearchWorkOrderModal from './components/SearchWorkOrderModal'
import SearchClient from './components/SearchClientModal'
import SearchEmployeeModal from './components/SearchEmployeeModal'
import NewClientModal from './components/NewClientModal'
import ClientList from './components/ClientList'
import { Toaster } from "@/components/ui/toaster"
import NewEmployeeModal from './components/NewEmployeeModal'
import EmployeeList from './components/EmployeeList'
import NewWorkOrderForm from './components/NewWorkOrderForm'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [showClientList, setShowClientList] = useState(false)
  const [showEmployeeList, setShowEmployeeList] = useState(false)
  const [showSearchClient, setShowSearchClient] = useState(false)
  const [showNewWorkOrder, setShowNewWorkOrder] = useState(false)

  const handleShowClientList = () => {
    setShowClientList(true)
    setShowEmployeeList(false)
    setShowSearchClient(false)
  }

  const handleShowEmployeeList = () => {
    setShowEmployeeList(true)
    setShowClientList(false)
    setShowSearchClient(false)
  }

  const handleShowSearchClient = () => {
    setShowSearchClient(true)
    setShowClientList(false)
    setShowEmployeeList(false)
  }

  const handleShowNewWorkOrder = () => {
    setShowNewWorkOrder(true)
    setShowClientList(false)
    setShowEmployeeList(false)
    setShowSearchClient(false)
  }

  return (
    <ModalProvider>
      <div className="min-h-screen bg-gray-100">
        <DashboardNav 
          onShowClientList={handleShowClientList} 
          onShowEmployeeList={handleShowEmployeeList}
          onShowSearchClient={handleShowSearchClient}
          onShowNewWorkOrder={handleShowNewWorkOrder}
        />
        <main className="container mx-auto px-4 py-8">
          {showClientList ? <ClientList /> : 
           showEmployeeList ? <EmployeeList /> : 
           showSearchClient ? <SearchClient /> : 
           showNewWorkOrder ? <NewWorkOrderForm /> : 
           children}
        </main>
        <SearchWorkOrderModal />
        <SearchEmployeeModal />
        <NewClientModal />
        <NewEmployeeModal /> 
        <Toaster />
      </div>
    </ModalProvider>
  )
}