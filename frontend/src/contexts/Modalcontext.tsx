'use client'

import React, { createContext, useState, useContext } from 'react'

type ModalContextType = {
  isSearchWorkOrderOpen: boolean
  isSearchClientOpen: boolean
  isSearchEmployeeOpen: boolean
  isNewClientOpen: boolean
  isNewEmployeeOpen: boolean
  openSearchWorkOrder: () => void
  openSearchClient: () => void
  openSearchEmployee: () => void
  openNewClient: () => void
  openNewEmployee: () => void
  closeAllModals: () => void
  openEmployeeList: () => void
  isEmployeeListOpen: boolean
  isNewWorkOrderOpen: boolean
  openNewWorkOrder: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSearchWorkOrderOpen, setIsSearchWorkOrderOpen] = useState(false)
  const [isSearchClientOpen, setIsSearchClientOpen] = useState(false)
  const [isSearchEmployeeOpen, setIsSearchEmployeeOpen] = useState(false)
  const [isNewClientOpen, setIsNewClientOpen] = useState(false)
  const [isNewEmployeeOpen, setIsNewEmployeeOpen] = useState(false)
  const [isEmployeeListOpen, setIsEmployeeListOpen] = useState(false)
  const [isNewWorkOrderOpen, setIsNewWorkOrderOpen] = useState(false)

  const openSearchWorkOrder = () => {
    closeAllModals()
    setIsSearchWorkOrderOpen(true)
    setIsSearchClientOpen(false)
    setIsSearchEmployeeOpen(false)
  }

  const openSearchClient = () => {
    closeAllModals()
    setIsSearchClientOpen(true)
    setIsSearchEmployeeOpen(false)
  }

  const openSearchEmployee = () => {
    closeAllModals()
    setIsSearchEmployeeOpen(true)
  }

  const openNewClient = () => {
    closeAllModals()
    setIsNewClientOpen(true)
  }

  const openNewEmployee = () => {
    closeAllModals()
    setIsNewEmployeeOpen(true)
  }

  const closeAllModals = () => {
    setIsSearchWorkOrderOpen(false)
    setIsSearchClientOpen(false)
    setIsSearchEmployeeOpen(false)
    setIsNewClientOpen(false)
    setIsNewEmployeeOpen(false)
    setIsEmployeeListOpen(false)
  }

  const openEmployeeList = () => {
    closeAllModals()
    setIsEmployeeListOpen(true)
  }

  const openNewWorkOrder = () => {
    closeAllModals()
    setIsNewWorkOrderOpen(true)
  }

  return (
    <ModalContext.Provider
      value={{
        isSearchWorkOrderOpen,
        isSearchClientOpen,
        isSearchEmployeeOpen,
        isNewClientOpen,
        isNewEmployeeOpen,
        openSearchWorkOrder,
        openSearchClient,
        openSearchEmployee,
        openNewClient,
        openNewEmployee,
        closeAllModals,
        openEmployeeList,
        isEmployeeListOpen,
        isNewWorkOrderOpen,
        openNewWorkOrder
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal debe ser usado dentro de un ModalProvider')
  }
  return context
}