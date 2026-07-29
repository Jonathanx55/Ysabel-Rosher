import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useOrders } from "../context/OrderContext";
import { formatDOP } from "../utils/currency";

export function AdminClients() {
  const { orders } = useOrders();

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('es-DO', { 
      day: '2-digit', month: 'short', year: 'numeric' 
    });
  };

  // Agrupar órdenes por email para obtener los clientes únicos
  const clientsMap = new Map();
  
  orders.forEach(order => {
    const { email, firstName, lastName, phone } = order.client;
    if (!clientsMap.has(email)) {
      clientsMap.set(email, {
        id: `C${Math.random().toString(36).substr(2, 6).toUpperCase()}`, // Fake ID for now
        name: `${firstName} ${lastName}`,
        email,
        phone,
        orders: 1,
        totalSpent: order.total,
        lastOrder: order.date
      });
    } else {
      const client = clientsMap.get(email);
      client.orders += 1;
      client.totalSpent += order.total;
      if (new Date(order.date) > new Date(client.lastOrder)) {
        client.lastOrder = order.date;
      }
    }
  });

  const clients = Array.from(clientsMap.values());

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-serif text-stone-900 mb-2">Directorio de Clientes</h1>
          <p className="text-stone-600">Administra la información y el historial de tus clientes.</p>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-stone-400" />
          </div>
          <input type="text" placeholder="Buscar cliente..." className="pl-10 pr-4 py-2 border border-stone-300 rounded-md text-sm w-full md:w-64 focus:outline-none focus:ring-1 focus:ring-stone-500" />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-sm text-stone-500">
                <th className="py-3 px-6 font-medium">Nombre</th>
                <th className="py-3 px-6 font-medium">Correo Electrónico</th>
                <th className="py-3 px-6 font-medium">Teléfono</th>
                <th className="py-3 px-6 font-medium">Pedidos</th>
                <th className="py-3 px-6 font-medium">Total Gastado</th>
                <th className="py-3 px-6 font-medium">Último Pedido</th>
                <th className="py-3 px-6 font-medium text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {clients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-stone-500">No hay clientes registrados.</td>
                </tr>
              ) : (
                clients.map((client) => (
                  <tr key={client.email} className="border-b border-stone-100 last:border-0 hover:bg-stone-50">
                    <td className="py-4 px-6 text-stone-900 font-medium">{client.name}</td>
                    <td className="py-4 px-6 text-stone-600">{client.email}</td>
                    <td className="py-4 px-6 text-stone-600">{client.phone}</td>
                    <td className="py-4 px-6 text-stone-600">{client.orders}</td>
                    <td className="py-4 px-6 text-stone-900 font-medium">{formatDOP(client.totalSpent)}</td>
                    <td className="py-4 px-6 text-stone-500">{formatDate(client.lastOrder)}</td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-stone-600 hover:text-stone-900 font-medium text-xs uppercase tracking-wider">Ver Perfil</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {clients.length > 0 && (
          <div className="p-4 border-t border-stone-200 text-sm text-stone-500 flex justify-between items-center">
            <span>Mostrando 1 a {clients.length} de {clients.length} clientes</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-stone-300 rounded hover:bg-stone-50" disabled>Anterior</button>
              <button className="px-3 py-1 border border-stone-300 rounded hover:bg-stone-50 bg-white" disabled>Siguiente</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
