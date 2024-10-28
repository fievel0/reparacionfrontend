'use client'

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useModal } from '@/contexts/Modalcontext'
import { Cpu } from "lucide-react"
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

interface DashboardNavProps {
  readonly onViewChange: (view: string) => void
}

export default function DashboardNav({ onViewChange }: DashboardNavProps) {
  const { openNewClient, openNewEmployee } = useModal()
  const router = useRouter()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Cpu className="h-6 w-6 text-orange-500" />
            <span className="font-bold text-xl ml-2">Web App Reparaciones</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <NavDropdowns onViewChange={onViewChange} openNewClient={openNewClient} openNewEmployee={openNewEmployee} />
            <Button variant="ghost" onClick={handleLogout} className="text-red-600">
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

interface NavDropdownsProps {
  readonly onViewChange: (view: string) => void;
  readonly openNewClient: () => void;
  readonly openNewEmployee: () => void;
}

const NavDropdowns = ({ onViewChange, openNewClient, openNewEmployee }: NavDropdownsProps) => {
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="hover:bg-orange-100 hover:text-orange-500">
            Clientes
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[150px] bg-white border border-orange-100">
          <DropdownMenuItem className="hover:bg-orange-100 hover:text-orange-500 cursor-pointer" onSelect={openNewClient}>
            Nuevo Cliente
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-orange-100 hover:text-orange-500 cursor-pointer" onSelect={() => onViewChange('searchClient')}>
            Buscar Cliente
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-orange-100 hover:text-orange-500 cursor-pointer" onSelect={() => onViewChange('clientList')}>
            Listar Clientes
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="hover:bg-orange-100 hover:text-orange-500">Empleados</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[150px] bg-white border border-orange-100">
          <DropdownMenuItem className="hover:bg-orange-100 hover:text-orange-500 cursor-pointer" onSelect={openNewEmployee}>Nuevo Empleado</DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-orange-100 hover:text-orange-500 cursor-pointer" onSelect={() => onViewChange('employeeList')}>Listar Empleados</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="hover:bg-orange-100 hover:text-orange-500">Órdenes de Trabajo</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[150px] bg-white border border-orange-100">
          <DropdownMenuItem className="hover:bg-orange-100 cursor-pointer" onSelect={() => onViewChange('newWorkOrder')}>Nueva Orden</DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-orange-100 hover:text-orange-500 cursor-pointer" onSelect={() => onViewChange('searchWorkOrder')}>Buscar Orden</DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-orange-100 hover:text-orange-500 cursor-pointer" onSelect={() => onViewChange('workOrderList')}>Listar Órdenes</DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-orange-100 hover:text-orange-500 cursor-pointer" onSelect={() => onViewChange('equipmentList')}>Equipos en Reparación</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
