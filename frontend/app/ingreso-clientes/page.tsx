// app/ingreso-clientes/page.tsx
'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from 'react';

interface Cliente {
  id_customer: string;
  card_identifi: string;
  phone: string;
  mail: string;
  name: string; // Agregar el campo name
}

export default function IngresoClientes() {
  const [cliente, setCliente] = useState<Cliente>({
    id_customer: '',
    card_identifi: '',
    phone: '',
    mail: '',
    name: '' // Inicializar el nombre
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Estado para el mensaje de éxito

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8084/api/customer/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cliente.name,
          card_identifi: cliente.card_identifi,
          phone: cliente.phone,
          mail: cliente.mail,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al guardar el cliente');
      }
      setCliente({ id_customer: '', card_identifi: '', phone: '', mail: '', name: '' }); // Reiniciar formulario
      setError(null); // Limpiar error
      setSuccessMessage("CLIENTE GUARDADO EXITOSAMENTE"); // Establecer mensaje de éxito
      setTimeout(() => {
        setSuccessMessage(null); // Ocultar mensaje después de 3 segundos
      }, 3000);
    } catch (error) {
      setError('Error al guardar el cliente. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100"> 
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <h1 className="text-5xl font-bold text-center text-sky-400 mb-6">INGRESO DE CLIENTES</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="id_customer">Código de Cliente</Label>
            <Input
              type="text"
              id="id_customer"
              name="id_customer"
              value={cliente.id_customer}
              onChange={handleChange}
              disabled
              placeholder="Generado automáticamente"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="name">Nombre</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={cliente.name}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="card_identifi">Cédula</Label>
            <Input
              type="text"
              id="card_identifi"
              name="card_identifi"
              value={cliente.card_identifi}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={cliente.phone}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="mail">Correo Electrónico</Label>
            <Input
              type="email"
              id="mail"
              name="mail"
              value={cliente.mail}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>
          <Button type="submit" className="w-full">Guardar Cliente</Button>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>} {/* Mostrar mensaje de error debajo del formulario */}
        {successMessage && <p className="text-green-500 text-center mt-4">{successMessage}</p>} {/* Mostrar mensaje de éxito debajo del formulario */}
      </div>
    </div>
  );
}
