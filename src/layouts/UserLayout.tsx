import { Link, Outlet, useLocation } from "react-router-dom";
import { User, Menu, X, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../context/CartContext";
import { CartDrawer } from "../components/CartDrawer";

export function UserLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems, setIsCartOpen } = useCart();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 group">
            {/* 
              Logo image placeholder. User should upload their image as 'logo.png' to 'src/assets/images/'
              and import it here to replace the text if they want.
            */}
            <div className="w-12 h-12 border border-gold-400 flex items-center justify-center rounded-none bg-black text-gold-400 font-serif text-xl group-hover:bg-gold-500 group-hover:text-black group-hover:border-black transition-colors duration-300">
              YR
            </div>
            <span className="text-xl font-serif text-black tracking-widest uppercase hidden sm:block">
              Ysabel Rosher
            </span>
          </Link>
          
          <nav className="hidden md:flex gap-8 items-center">
            <Link to="/catalog" className="text-sm font-medium text-black/70 hover:text-gold-500 uppercase tracking-widest transition-colors">Catálogo</Link>
            <Link to="/about" className="text-sm font-medium text-black/70 hover:text-gold-500 uppercase tracking-widest transition-colors">Nosotros</Link>
            <Link to="/contact" className="text-sm font-medium text-black/70 hover:text-gold-500 uppercase tracking-widest transition-colors">Contacto</Link>
            <button onClick={() => setIsCartOpen(true)} className="relative text-black/70 hover:text-gold-500 transition-colors">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {totalItems}
                </span>
              )}
            </button>
            <Link to="/admin/login" className="text-sm font-medium text-black/70 hover:text-gold-500 uppercase tracking-widest transition-colors flex items-center gap-2">
              <User size={16} /> Admin
            </Link>
          </nav>

          <div className="md:hidden flex items-center gap-6">
            <button onClick={() => setIsCartOpen(true)} className="relative text-black/70 hover:text-gold-500 transition-colors">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {totalItems}
                </span>
              )}
            </button>
            <button onClick={toggleMenu} className="text-black hover:text-gold-500 transition-colors">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white border-b border-black/10 overflow-hidden"
            >
              <div className="px-4 py-6 flex flex-col gap-6 text-center">
                <Link to="/catalog" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-black/70 hover:text-gold-500 uppercase tracking-widest transition-colors">Catálogo</Link>
                <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-black/70 hover:text-gold-500 uppercase tracking-widest transition-colors">Nosotros</Link>
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-black/70 hover:text-gold-500 uppercase tracking-widest transition-colors">Contacto</Link>
                <Link to="/admin/login" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-black/70 hover:text-gold-500 uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
                  <User size={16} /> Admin
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1 relative">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="w-full h-full"
        >
          <Outlet />
        </motion.div>
      </main>

      <footer className="bg-black text-white py-16 text-center border-t border-gold-400/20">
        <div className="w-12 h-px bg-gold-400 mx-auto mb-8"></div>
        <p className="font-serif tracking-widest text-lg mb-4 text-gold-400">Ysabel Rosher</p>
        <p className="font-light text-white/60 text-sm tracking-wide">© 2026 Esencias y Cuidados Artesanales.</p>
        <div className="mt-8 flex justify-center gap-8 text-xs uppercase tracking-widest flex-wrap px-4">
          <Link to="/faq" className="text-white/60 hover:text-gold-400 transition-colors">Preguntas Frecuentes</Link>
          <Link to="/contact" className="text-white/60 hover:text-gold-400 transition-colors">Contacto</Link>
          <Link to="/about" className="text-white/60 hover:text-gold-400 transition-colors">Historia</Link>
        </div>
      </footer>
      <CartDrawer />
    </div>
  );
}
