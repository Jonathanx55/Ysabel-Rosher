import { Link } from "react-router-dom";

export function AdminConfig() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-serif text-stone-900 mb-2">Configuración de Boutique</h1>
        <p className="text-stone-600">Ajusta los parámetros generales de tu tienda en línea.</p>
      </div>

      <div className="bg-white rounded-lg border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-200">
          <h2 className="text-lg font-medium text-stone-900">Información General</h2>
          <p className="text-sm text-stone-500 mb-4">Actualiza los datos de contacto y la información pública.</p>
          
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Nombre de la Tienda</label>
                <input type="text" defaultValue="Ysabel Rosher" className="w-full border border-stone-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-stone-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Correo de Contacto</label>
                <input type="email" defaultValue="info@ysabelrosher.com" className="w-full border border-stone-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-stone-500 focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Descripción Corta</label>
              <textarea rows={3} className="w-full border border-stone-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-stone-500 focus:outline-none" defaultValue="Esencias y Detalles Artesanales. Ysabel Rosher ofrece una colección exclusiva de productos artesanales diseñados para armonizar tu hogar y tu piel."></textarea>
            </div>
            <div className="pt-2">
              <button type="button" className="bg-stone-900 text-white px-4 py-2 rounded-md hover:bg-stone-800 transition-colors">
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
        
        <div className="p-6">
          <h2 className="text-lg font-medium text-stone-900">Preferencias de Sistema</h2>
          <p className="text-sm text-stone-500 mb-4">Configuraciones operativas.</p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-stone-900">Modo de Mantenimiento</h4>
                <p className="text-xs text-stone-500">Ocultar la tienda temporalmente al público.</p>
              </div>
              <button type="button" className="bg-stone-200 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none">
                <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-stone-900">Notificaciones de Pedido</h4>
                <p className="text-xs text-stone-500">Recibir email cuando se realiza una nueva compra.</p>
              </div>
              <button type="button" className="bg-emerald-500 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none">
                <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
