import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

interface EquipmentDetailsModalProps {
  equipment: Equipment
  onClose: () => void
}

export default function EquipmentDetailsModal({ equipment, onClose }: EquipmentDetailsModalProps) {
  if (!equipment) {
    return null; // O puedes mostrar un mensaje de carga o error
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalles del Equipo</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>ID:</strong> {equipment.id_equip}
            </div>
            <div>
              <strong>Modelo:</strong> {equipment.model_equip}
            </div>
            <div>
              <strong>Marca:</strong> {equipment.brand_equip}
            </div>
            <div>
              <strong>Color:</strong> {equipment.color_equip}
            </div>
            <div>
              <strong>Estado:</strong> {equipment.state_equip}
            </div>
            <div>
              <strong>Contraseña:</strong> {equipment.pass_equip}
            </div>
            <div>
              <strong>Antigüedad:</strong> {equipment.anti_equip}
            </div>
            <div>
              <strong>Accesorios:</strong> {equipment.accessor_equip}
            </div>
            <div>
              <strong>Reportado:</strong> {equipment.reported_equip}
            </div>
            <div>
              <strong>Detalle físico:</strong> {equipment.detail_phy_equip}
            </div>
            <div>
              <strong>Temperatura:</strong> {equipment.temp_equip}
            </div>
            <div>
              <strong>Encendido/Apagado:</strong> {equipment.on_off_equip ? 'Sí' : 'No'}
            </div>
            <div>
              <strong>Causa del daño:</strong> {equipment.cau_dam_equip}
            </div>
            <div>
              <strong>ID del cliente:</strong> {equipment.id_customer}
            </div>
            <div>
              <strong>Nombre del cliente:</strong> {equipment.name}
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
