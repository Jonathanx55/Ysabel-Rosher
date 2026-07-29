import { Link } from "react-router-dom";
import { Search, Filter, Eye } from "lucide-react";
import { useOrders, Order } from "../context/OrderContext";
import { formatDOP } from "../utils/currency";

export function AdminOrders() {
  const { orders, updateOrderStatus } = useOrders();

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('es-DO', { 
      day: '2-digit', month: 'short', year: 'numeric', 
      hour: '2-digit', minute: '2-digit' 
    });
  };

  const handleStatusChange = (id: string, newStatus: Order['status']) => {
    updateOrderStatus(id, newStatus);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-serif text-stone-900 mb-2">Gestión de Pedidos</h1>
          <p className="text-stone-600">Revisa, procesa y administra todas las órdenes de la tienda.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-stone-300 rounded-md text-sm bg-white hover:bg-stone-50 text-stone-700 transition-colors">
            <Filter size={16} /> Filtrar
          </button>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-stone-400" />
            </div>
            <input type="text" placeholder="Buscar pedido..." className="pl-10 pr-4 py-2 border border-stone-300 rounded-md text-sm w-full md:w-64 focus:outline-none focus:ring-1 focus:ring-stone-500 bg-white" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-sm text-stone-500">
                <th className="py-3 px-6 font-medium">Pedido</th>
                <th className="py-3 px-6 font-medium">Fecha</th>
                <th className="py-3 px-6 font-medium">Cliente</th>
                <th className="py-3 px-6 font-medium">Estado</th>
                <th className="py-3 px-6 font-medium">Artículos</th>
                <th className="py-3 px-6 font-medium">Total</th>
                <th className="py-3 px-6 font-medium text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-stone-500">No hay pedidos registrados.</td>
                </tr>
              ) : (
                orders.map((order, i) => (
                  <tr key={order.id} className="border-b border-stone-100 last:border-0 hover:bg-stone-50">
                    <td className="py-4 px-6 text-stone-900 font-medium">{order.id}</td>
                    <td className="py-4 px-6 text-stone-500">{formatDate(order.date)}</td>
                    <td className="py-4 px-6 text-stone-600">
                      <div>{order.client.firstName} {order.client.lastName}</div>
                      <div className="text-xs text-stone-400">{order.client.phone}</div>
                    </td>
                    <td className="py-4 px-6">
                      <select 
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                        className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer border-none focus:ring-0 ${
                          order.status === 'Completado' ? 'bg-emerald-100 text-emerald-700' :
                          order.status === 'Enviado' ? 'bg-blue-100 text-blue-700' :
                          order.status === 'Procesando' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}
                      >
                        <option value="Procesando" className="bg-white text-stone-900">Procesando</option>
                        <option value="Enviado" className="bg-white text-stone-900">Enviado</option>
                        <option value="Completado" className="bg-white text-stone-900">Completado</option>
                        <option value="Cancelado" className="bg-white text-stone-900">Cancelado</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 text-stone-600">{order.items.reduce((acc, item) => acc + item.quantity, 0)}</td>
                    <td className="py-4 px-6 text-stone-900 font-medium">{formatDOP(order.total)}</td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-stone-600 hover:text-gold-500 transition-colors" title="Ver Detalles">
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {orders.length > 0 && (
          <div className="p-4 border-t border-stone-200 text-sm text-stone-500 flex justify-between items-center">
            <span>Mostrando 1 a {orders.length} de {orders.length} pedidos</span>
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
