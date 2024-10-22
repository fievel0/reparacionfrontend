import { Client } from "./Client"
import { Equipment } from "./Equipment"
import { Payments } from "./Payments"

export interface Employee {
    idEmployee: number
    nameEmployee: string
    positionEmployee: string
    cedEmployee: string
    dirEmployee: string
    telEmployee: string
    orders?: Order[]
  }
  
  // Interfaz adicional para Order
  interface Order {
    id_order: number
    create_date: string
    deadline: string
    tot_pay: number
    addit_details: string
    customer: Client
    equipment: Equipment
    payments: Payments
    employee: Employee

  }
