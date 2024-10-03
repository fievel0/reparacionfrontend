import { Client } from "./Client"
import { Equipment } from "./Equipment"
import { Employee } from "./Employee"

export interface WorkOrder {
    id_order: number
    create_date: string
    deadline: string
    tot_pay: number
    addit_details: string
    customer: Client    
    equipment: Equipment
    employee: Employee
}

export interface WorkOrderListProps {
    workOrders: WorkOrder[]
    onEdit: (workOrder: WorkOrder) => void
    onDelete: (id: string) => void
}

export interface WorkOrderDetailsProps {
    workOrder: WorkOrder
    onEdit?: (workOrder: WorkOrder) => void
    onDelete?: (id: string) => void
}

export interface NewWorkOrderFormData {
    create_date: string
    deadline: string
    tot_pay: number
    addit_details: string
    id_customer: number
    id_equip: number
    idEmployee: number
}  


