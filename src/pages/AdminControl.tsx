import { Link } from "react-router-dom";
import { LayoutDashboard, Users, ShoppingCart, Settings } from "lucide-react";

export function AdminControl() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-serif text-stone-900 mb-2">Panel de Control Principal</h1>
        <p className="text-stone-600">Bienvenido al sistema de gestión de Ysabel Rosher.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/admin/dashboard" className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm hover:border-stone-300 hover:shadow-md transition-all flex items-center gap-4 group">
          <div className="p-4 bg-stone-100 rounded-full text-stone-700 group-hover:bg-stone-900 group-hover:text-white transition-colors">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <h3 className="text-lg font-medium text-stone-900">Dashboard de Ventas</h3>
            <p className="text-sm text-stone-500">Métricas, resumen y estadísticas</p>
          </div>
        </Link>
        
        <Link to="/admin/orders" className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm hover:border-stone-300 hover:shadow-md transition-all flex items-center gap-4 group">
          <div className="p-4 bg-stone-100 rounded-full text-stone-700 group-hover:bg-stone-900 group-hover:text-white transition-colors">
            <ShoppingCart size={24} />
          </div>
          <div>
            <h3 className="text-lg font-medium text-stone-900">Gestión de Pedidos</h3>
            <p className="text-sm text-stone-500">Revisar y procesar nuevas compras</p>
          </div>
        </Link>
        
        <Link to="/admin/clients" className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm hover:border-stone-300 hover:shadow-md transition-all flex items-center gap-4 group">
          <div className="p-4 bg-stone-100 rounded-full text-stone-700 group-hover:bg-stone-900 group-hover:text-white transition-colors">
            <Users size={24} />
          </div>
          <div>
            <h3 className="text-lg font-medium text-stone-900">Directorio de Clientes</h3>
            <p className="text-sm text-stone-500">Administrar base de datos de clientes</p>
          </div>
        </Link>

        <Link to="/admin/config" className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm hover:border-stone-300 hover:shadow-md transition-all flex items-center gap-4 group">
          <div className="p-4 bg-stone-100 rounded-full text-stone-700 group-hover:bg-stone-900 group-hover:text-white transition-colors">
            <Settings size={24} />
          </div>
          <div>
            <h3 className="text-lg font-medium text-stone-900">Configuración de Boutique</h3>
            <p className="text-sm text-stone-500">Ajustes generales e inventario</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
