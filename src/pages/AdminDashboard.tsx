import { Link } from "react-router-dom";
import { ArrowUpRight, TrendingUp, Users, ShoppingBag } from "lucide-react";
import { useOrders } from "../context/OrderContext";
import { formatDOP } from "../utils/currency";

export function AdminDashboard() {
  const { orders } = useOrders();

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('es-DO', { 
      day: '2-digit', month: 'short', year: 'numeric' 
    });
  };

  const totalSales = orders.filter(o => o.status === 'Completado').reduce((acc, order) => acc + order.total, 0);
  const totalOrders = orders.length;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-serif text-stone-900 mb-2">Dashboard</h1>
          <p className="text-stone-600">Resumen de actividad de la tienda.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-stone-100 rounded-md text-stone-700">
              <TrendingUp size={20} />
            </div>
            <span className="text-sm font-medium text-emerald-600 flex items-center"><ArrowUpRight size={16} /></span>
          </div>
          <h3 className="text-stone-500 text-sm font-medium mb-1">Ventas Totales (Completadas)</h3>
          <p className="text-2xl font-semibold text-stone-900">{formatDOP(totalSales)}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-stone-100 rounded-md text-stone-700">
              <ShoppingBag size={20} />
            </div>
            <span className="text-sm font-medium text-emerald-600 flex items-center"><ArrowUpRight size={16} /></span>
          </div>
          <h3 className="text-stone-500 text-sm font-medium mb-1">Pedidos Totales</h3>
          <p className="text-2xl font-semibold text-stone-900">{totalOrders}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-stone-100 rounded-md text-stone-700">
              <Users size={20} />
            </div>
            <span className="text-sm font-medium text-emerald-600 flex items-center"><ArrowUpRight size={16} /></span>
          </div>
          <h3 className="text-stone-500 text-sm font-medium mb-1">Clientes Únicos</h3>
          <p className="text-2xl font-semibold text-stone-900">{new Set(orders.map(o => o.client.email)).size}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-stone-200 shadow-sm p-6">
        <h3 className="text-lg font-medium text-stone-900 mb-4">Pedidos Recientes</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-stone-200 text-sm text-stone-500">
                <th className="py-3 font-medium">Pedido</th>
                <th className="py-3 font-medium">Cliente</th>
                <th className="py-3 font-medium">Fecha</th>
                <th className="py-3 font-medium">Estado</th>
                <th className="py-3 font-medium">Total</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-stone-500">No hay pedidos recientes.</td>
                </tr>
              ) : (
                orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="border-b border-stone-100 last:border-0 hover:bg-stone-50">
                    <td className="py-4 text-stone-900 font-medium">{order.id}</td>
                    <td className="py-4 text-stone-600">{order.client.firstName} {order.client.lastName}</td>
                    <td className="py-4 text-stone-500">{formatDate(order.date)}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Completado' ? 'bg-emerald-100 text-emerald-700' :
                        order.status === 'Enviado' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'Procesando' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 text-stone-900">{formatDOP(order.total)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-right">
          <Link to="/admin/orders" className="text-sm font-medium text-stone-600 hover:text-stone-900 underline">
            Ver todos los pedidos
          </Link>
        </div>
      </div>
    </div>
  );
}
