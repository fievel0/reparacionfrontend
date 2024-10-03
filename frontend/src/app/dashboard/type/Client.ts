

export interface Client {
  id_customer: number
  name: string
  card_identifi: string
  phone: string
  mail: string
}

export interface ClientListProps {
  clients: Client[]
  onEdit: (client: Client) => void
  onDelete: (id: string) => void
}

export interface ClientDetailsProps {
  client: Client
  onEdit?: (client: Client) => void
  onDelete?: (id: string) => void
}

export interface NewClientFormData {
  name: string
  card_identifi: string
  phone: string
  mail: string
}

export interface EditClientModalProps {
  client: Client
  onSave: (updatedClient: Client) => void
  onCancel: () => void
}

export interface SearchClientModalProps {
  isOpen: boolean
  onClose: () => void
}