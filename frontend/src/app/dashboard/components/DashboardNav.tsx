'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useModal } from '@/contexts/Modalcontext'

export default function DashboardNav({ 
  onShowClientList, 
  onShowEmployeeList,
  onShowSearchClient
}: { 
  onShowClientList: () => void,
  onShowEmployeeList: () => void,
  onShowSearchClient: () => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const { openSearchWorkOrder, openNewClient, openNewEmployee, openNewWorkOrder } = useModal()

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="font-bold text-xl">Web App Reparaciones</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">Clientes</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onSelect={openNewClient}>
                    Nuevo Cliente
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={onShowSearchClient}>
                    Buscar Cliente
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={onShowClientList}>
                    Listar Clientes
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">Empleados</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onSelect={openNewEmployee}>
                    Nuevo Empleado
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={onShowEmployeeList}>
                    Listar Empleados
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">Orden de Trabajo</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onSelect={openNewWorkOrder}>
                    Nueva Orden
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={openSearchWorkOrder}>
                    Buscar Orden de Trabajo
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/dashboard/work-orders">Todas las Ordenes de Trabajo</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost">Configuración</Button>
            </div>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
              <span className="sr-only">Abrir menú principal</span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </Button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full text-left">Clientes</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={openNewClient}>
                  Nuevo Cliente
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={onShowSearchClient}>
                  Buscar Cliente
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={onShowClientList}>
                  Listar Clientes
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full text-left">Empleados</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={openNewEmployee}>
                  Nuevo Empleado
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={onShowEmployeeList}>
                  Listar Empleados
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full text-left">Orden de Trabajo</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/dashboard/work-orders/new" className="w-full">Nueva Orden</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={openSearchWorkOrder}>
                  Buscar Orden de Trabajo
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/dashboard/work-orders" className="w-full">Todas las Ordenes de Trabajo</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="ghost" className="w-full text-left">Configuración</Button>
          </div>
        </div>
      )}
    </nav>
  )
}