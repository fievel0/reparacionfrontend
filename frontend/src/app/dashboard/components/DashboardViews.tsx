import { ReactNode } from 'react'
import ClientList from './ClientList'
import EmployeeList from './EmployeeList'
import WorkOrderList from './WorkOrderList'
import EquipmentList from './EquipmentList'
import SearchClientModal from './SearchClientModal'
import NewWorkOrderForm from './NewWorkOrderForm'
import SearchWorkOrderForm from './SearchWorkOrderForm'

interface DashboardViewsProps {
  readonly activeView: string
  readonly children: ReactNode
}

export default function DashboardViews({ activeView, children }: DashboardViewsProps) {
  const renderView = () => {
    switch (activeView) {
      case 'clientList':
        return <ClientList />
      case 'employeeList':
        return <EmployeeList />
      case 'searchClient':
        return <SearchClientModal />
      case 'newWorkOrder':
        return <NewWorkOrderForm />
      case 'searchWorkOrder':
        return <SearchWorkOrderForm />
      case 'workOrderList':
        return <WorkOrderList />
      case 'equipmentList':
        return <EquipmentList />
      default:
        return children
    }
  }

  return <div className="container mx-auto px-4 py-8">{renderView()}</div>
}

