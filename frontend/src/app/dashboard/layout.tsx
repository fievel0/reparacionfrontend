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
  const [isSearchWorkOrderOpen, setIsSearchWorkOrderOpen] = useState(false)

  const handleShowClientList = () => {
    setShowClientList(true)
    setShowEmployeeList(false)
    setShowSearchClient(false)
    setShowNewWorkOrder(false)
    setIsSearchWorkOrderOpen(false)
  }

  const handleShowEmployeeList = () => {
    setShowEmployeeList(true)
    setShowClientList(false)
    setShowSearchClient(false)
    setShowNewWorkOrder(false)
    setIsSearchWorkOrderOpen(false)
  }

  const handleShowSearchClient = () => {
    setShowSearchClient(true)
    setShowClientList(false)
    setShowEmployeeList(false)
    setShowNewWorkOrder(false)
    setIsSearchWorkOrderOpen(false)
  }

  const handleShowNewWorkOrder = () => {
    setShowNewWorkOrder(true)
    setShowClientList(false)
    setShowEmployeeList(false)
    setShowSearchClient(false)
    setIsSearchWorkOrderOpen(false)
  }

  const openSearchWorkOrder = () => {
    setIsSearchWorkOrderOpen(true)
    setShowClientList(false)
    setShowEmployeeList(false)
    setShowSearchClient(false)
    setShowNewWorkOrder(false)
  }

  return (
    <ModalProvider>
      <div className="min-h-screen bg-gray-100">
        <DashboardNav 
          onShowNewWorkOrder={handleShowNewWorkOrder}
          onShowClientList={handleShowClientList} 
          onShowEmployeeList={handleShowEmployeeList}
          onShowSearchClient={handleShowSearchClient}
          openSearchWorkOrder={openSearchWorkOrder}
        />
        <main className="container mx-auto px-4 py-8">
          {showNewWorkOrder ? <NewWorkOrderForm /> : 
           showClientList ? <ClientList /> : 
           showEmployeeList ? <EmployeeList /> : 
           showSearchClient ? <SearchClient /> : 
           children}
        </main>
        <NewClientModal />
        <NewEmployeeModal /> 
        <SearchEmployeeModal />
        <SearchWorkOrderModal isSearchWorkOrderOpen={isSearchWorkOrderOpen} closeAllModals={() => setIsSearchWorkOrderOpen(false)} />
        <Toaster />
      </div>
    </ModalProvider>
  )
}
