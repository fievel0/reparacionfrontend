import { ReactNode, useState } from 'react'
import DashboardNav from './DashboardNav'
import DashboardViews from './DashboardViews'
import DashboardModals from './DashboardModals'
import { Toaster } from "@/components/ui/toaster"

interface DashboardContentProps {
  readonly children: ReactNode;
}

export default function DashboardContent({ children }: DashboardContentProps) {
  const [activeView, setActiveView] = useState('default')
  const [selectedEquipment, setSelectedEquipment] = useState(null)

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <DashboardNav onViewChange={setActiveView} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <DashboardViews activeView={activeView}>
          {children}
        </DashboardViews>
      </main>
      <DashboardModals 
        selectedEquipment={selectedEquipment}
        onEquipmentClose={() => setSelectedEquipment(null)}
      />
      <Toaster />
    </div>
  )
}
