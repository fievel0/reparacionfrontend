import NewClientModal from './NewClientModal'
import NewEmployeeModal from './NewEmployeeModal'
import SearchEmployeeModal from './SearchEmployeeModal'
import EquipmentDetailsModal from './EquipmentDetailsModal'
import { Equipment } from '../type/Equipment'


interface DashboardModalsProps {
  readonly selectedEquipment: Equipment | null
  readonly onEquipmentClose: () => void
}

export default function DashboardModals({ selectedEquipment, onEquipmentClose }: DashboardModalsProps) {
  return (
    <>
      <NewClientModal />
      <NewEmployeeModal />
      <SearchEmployeeModal />
      {selectedEquipment && (
        <EquipmentDetailsModal 
          equipment={selectedEquipment}
          onClose={onEquipmentClose}
        />
      )}
    </>
  )
}

