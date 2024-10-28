'use client'

import React, { createContext, useState, useContext, useMemo, useCallback } from 'react'

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

  const closeAllModals = useCallback(() => {
    setIsSearchWorkOrderOpen(false)
    setIsSearchClientOpen(false)
    setIsSearchEmployeeOpen(false)
    setIsNewClientOpen(false)
    setIsNewEmployeeOpen(false)
    setIsEmployeeListOpen(false)
    setIsNewWorkOrderOpen(false)
  }, [])

  const openSearchWorkOrder = useCallback(() => {
    closeAllModals()
    setIsSearchWorkOrderOpen(true)
  }, [closeAllModals])

  const openSearchClient = useCallback(() => {
    closeAllModals()
    setIsSearchClientOpen(true)
  }, [closeAllModals])

  const openSearchEmployee = useCallback(() => {
    closeAllModals()
    setIsSearchEmployeeOpen(true)
  }, [closeAllModals])

  const openNewClient = useCallback(() => {
    closeAllModals()
    setIsNewClientOpen(true)
  }, [closeAllModals])

  const openNewEmployee = useCallback(() => {
    closeAllModals()
    setIsNewEmployeeOpen(true)
  }, [closeAllModals])

  const openEmployeeList = useCallback(() => {
    closeAllModals()
    setIsEmployeeListOpen(true)
  }, [closeAllModals])

  const openNewWorkOrder = useCallback(() => {
    closeAllModals()
    setIsNewWorkOrderOpen(true)
  }, [closeAllModals])

  const value = useMemo(() => ({
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
  }), [
    isSearchWorkOrderOpen,
    isSearchClientOpen,
    isSearchEmployeeOpen,
    isNewClientOpen,
    isNewEmployeeOpen,
    isEmployeeListOpen,
    isNewWorkOrderOpen,
    openSearchWorkOrder,
    openSearchClient,
    openSearchEmployee,
    openNewClient,
    openNewEmployee,
    openEmployeeList,
    openNewWorkOrder,
    closeAllModals // <- Agregar esta dependencia
  ])

  return (
    <ModalContext.Provider value={value}>
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
