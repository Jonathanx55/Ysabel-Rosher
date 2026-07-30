import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { formatDOP } from '../utils/currency';

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col border-l border-gold-400/20"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-black/10">
              <h2 className="text-sm font-medium text-black uppercase tracking-widest flex items-center gap-2">
                <ShoppingCart size={18} />
                Tu Carrito
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="text-black/60 hover:text-gold-500 transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-black/50 space-y-4">
                  <ShoppingCart size={48} className="opacity-20" />
                  <p className="font-light uppercase tracking-widest text-xs text-center">Tu carrito está vacío</p>
                  <button onClick={() => setIsCartOpen(false)} className="border-b border-black text-black pb-1 text-xs uppercase tracking-widest hover:text-gold-500 hover:border-gold-500 transition-colors duration-300">
                    Volver a la tienda
                  </button>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex gap-4 bg-black/5 p-4 relative group">
                    <div className="w-20 h-24 bg-white shrink-0">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xs font-medium text-black uppercase tracking-widest mb-1 pr-6 line-clamp-2">{item.name}</h3>
                        <p className="text-gold-500 font-light text-sm">{formatDOP(item.price)}</p>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center border border-black/20 bg-white">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-gold-500 transition-colors">
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-xs">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-gold-500 transition-colors">
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="absolute top-4 right-4 text-black/40 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-black/10 bg-black/5">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs uppercase tracking-widest text-black/70 font-medium">Subtotal</span>
                  <span className="text-lg text-black font-medium">{formatDOP(totalPrice)}</span>
                </div>
                <Link to="/checkout" onClick={() => setIsCartOpen(false)} className="block w-full bg-black text-white text-center py-4 text-xs uppercase tracking-widest hover:bg-gold-500 hover:text-black transition-colors duration-300">
                  Proceder al Pago
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
