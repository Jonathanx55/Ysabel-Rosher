import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, ShoppingCart, Settings, ArrowLeft, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function AdminLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const sidebarContent = (
    <>
      <div className="p-6 text-center border-b border-white/10 mb-4">
        <div translate="no" className="w-10 h-10 border border-gold-400 flex items-center justify-center rounded-none bg-black text-gold-400 font-serif text-lg mx-auto mb-3">
          YR
        </div>
        <h2 className="text-lg font-serif text-white uppercase tracking-widest">Ysabel Rosher</h2>
        <div className="w-8 h-px bg-gold-400 mx-auto mt-2 mb-2"></div>
        <p className="text-[10px] text-gold-400 uppercase tracking-widest">Panel de Control</p>
      </div>
      <nav className="flex-1 px-4 flex flex-col gap-2">
        <Link to="/admin/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-none hover:bg-gold-500 hover:text-black transition-colors uppercase text-xs tracking-widest">
          <LayoutDashboard size={16} /> Dashboard
        </Link>
        <Link to="/admin/orders" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-none hover:bg-gold-500 hover:text-black transition-colors uppercase text-xs tracking-widest">
          <ShoppingCart size={16} /> Pedidos
        </Link>
        <Link to="/admin/clients" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-none hover:bg-gold-500 hover:text-black transition-colors uppercase text-xs tracking-widest">
          <Users size={16} /> Clientes
        </Link>
        <Link to="/admin/control" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-none hover:bg-gold-500 hover:text-black transition-colors uppercase text-xs tracking-widest">
          <Settings size={16} /> General
        </Link>
      </nav>
      <div className="p-4 border-t border-white/10">
        <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-none text-white/50 hover:bg-gold-500 hover:text-black transition-colors uppercase text-xs tracking-widest">
          <ArrowLeft size={16} /> Volver a la Tienda
        </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-white overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-black border-b border-gold-400/20 z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div translate="no" className="w-8 h-8 border border-gold-400 flex items-center justify-center bg-black text-gold-400 font-serif text-sm">
            YR
          </div>
          <span className="text-white font-serif tracking-widest text-sm uppercase">Admin</span>
        </div>
        <button onClick={toggleMenu} className="text-white hover:text-gold-400 transition-colors">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-black text-white/70 flex-col border-r border-gold-400/20 z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="md:hidden fixed top-16 left-0 bottom-0 w-64 bg-black text-white/70 flex flex-col border-r border-gold-400/20 z-40"
          >
            {sidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>

      <main className="flex-1 overflow-auto bg-white pt-16 md:pt-0 relative">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="h-full"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}
