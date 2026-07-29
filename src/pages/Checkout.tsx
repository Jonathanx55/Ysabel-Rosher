import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { formatDOP } from '../utils/currency';
import { CheckCircle2, ArrowLeft, CreditCard, Wallet } from 'lucide-react';
import { motion } from 'motion/react';

export function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string>('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    phone: '',
    paymentMethod: 'transfer',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id || name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generar un ID de orden falso para la simulación
    const generatedOrder = Math.floor(10000 + Math.random() * 90000).toString();
    setOrderNumber(generatedOrder);

    // Save order
    addOrder({
      id: `#${generatedOrder}`,
      client: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        phone: formData.phone,
      },
      items: items,
      total: totalPrice,
      paymentMethod: formData.paymentMethod,
    });

    // Preparar mensaje para WhatsApp
    let message = `¡Hola! Me gustaría realizar un pedido (Orden #${generatedOrder}):\n\n`;
    
    items.forEach(item => {
      message += `- ${item.quantity}x ${item.name} (${formatDOP(item.price * item.quantity)})\n`;
    });
    
    message += `\n*Subtotal:* ${formatDOP(totalPrice)}`;
    message += `\n*Envío:* Gratis`;
    message += `\n*Total a pagar:* ${formatDOP(totalPrice)}\n\n`;
    
    message += `*Datos de Envío:*\n`;
    message += `Nombre: ${formData.firstName} ${formData.lastName}\n`;
    message += `Teléfono: ${formData.phone}\n`;
    message += `Dirección: ${formData.address}, ${formData.city}\n`;
    message += `Método de pago: ${formData.paymentMethod === 'transfer' ? 'Transferencia Bancaria' : 'Efectivo a contraentrega'}`;
    
    // Redirigir a WhatsApp (usando el número de la tienda)
    const phone = "18492102243";
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    setIsSuccess(true);
    clearCart();
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-32 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="flex flex-col items-center">
          <CheckCircle2 size={64} className="text-gold-500 mb-6" />
          <h1 className="text-3xl font-serif text-black uppercase tracking-widest mb-4">¡Gracias por tu compra!</h1>
          <p className="text-black text-lg font-medium mb-2">Orden #{orderNumber}</p>
          <p className="text-black/70 font-light mb-8">
            Tu pedido ha sido registrado. Serás redirigido a nuestro WhatsApp para completar el proceso y {formData.paymentMethod === 'transfer' ? 'enviar el comprobante de transferencia' : 'coordinar la entrega'}.
          </p>
          <Link to="/catalog" className="inline-block bg-black text-white px-8 py-4 rounded-none text-xs uppercase tracking-widest hover:bg-gold-500 hover:text-black transition-colors duration-300">
            Seguir Comprando
          </Link>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-32 text-center">
        <h1 className="text-2xl font-serif text-black uppercase tracking-widest mb-4">Tu carrito está vacío</h1>
        <p className="text-black/70 font-light mb-8">No puedes proceder al pago sin productos en el carrito.</p>
        <Link to="/catalog" className="inline-block bg-black text-white px-8 py-4 rounded-none text-xs uppercase tracking-widest hover:bg-gold-500 hover:text-black transition-colors duration-300">
          Ver Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-10">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs uppercase tracking-widest text-black/60 hover:text-gold-500 transition-colors">
          <ArrowLeft size={16} /> Volver
        </button>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Formulario */}
        <div className="flex-1">
          <h1 className="text-3xl font-serif text-black uppercase tracking-widest mb-2">Finalizar Compra</h1>
          <div className="w-16 h-px bg-gold-400 mb-10"></div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white p-8 border border-black/10 shadow-sm space-y-6">
              <h2 className="text-sm font-medium text-black uppercase tracking-widest border-b border-black/10 pb-4">Información de Contacto</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-xs font-medium text-black uppercase tracking-widest mb-2">Nombre</label>
                  <input required type="text" id="firstName" value={formData.firstName} onChange={handleChange} className="w-full border border-black/10 bg-black/5 rounded-none px-4 py-3 focus:outline-none focus:bg-white focus:ring-1 focus:ring-gold-400 transition-colors" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs font-medium text-black uppercase tracking-widest mb-2">Apellidos</label>
                  <input required type="text" id="lastName" value={formData.lastName} onChange={handleChange} className="w-full border border-black/10 bg-black/5 rounded-none px-4 py-3 focus:outline-none focus:bg-white focus:ring-1 focus:ring-gold-400 transition-colors" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="email" className="block text-xs font-medium text-black uppercase tracking-widest mb-2">Correo Electrónico</label>
                  <input required type="email" id="email" value={formData.email} onChange={handleChange} className="w-full border border-black/10 bg-black/5 rounded-none px-4 py-3 focus:outline-none focus:bg-white focus:ring-1 focus:ring-gold-400 transition-colors" />
                </div>
              </div>
            </div>

            <div className="bg-white p-8 border border-black/10 shadow-sm space-y-6">
              <h2 className="text-sm font-medium text-black uppercase tracking-widest border-b border-black/10 pb-4">Dirección de Envío</h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="address" className="block text-xs font-medium text-black uppercase tracking-widest mb-2">Dirección</label>
                  <input required type="text" id="address" value={formData.address} onChange={handleChange} className="w-full border border-black/10 bg-black/5 rounded-none px-4 py-3 focus:outline-none focus:bg-white focus:ring-1 focus:ring-gold-400 transition-colors" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="city" className="block text-xs font-medium text-black uppercase tracking-widest mb-2">Ciudad</label>
                    <input required type="text" id="city" value={formData.city} onChange={handleChange} className="w-full border border-black/10 bg-black/5 rounded-none px-4 py-3 focus:outline-none focus:bg-white focus:ring-1 focus:ring-gold-400 transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-medium text-black uppercase tracking-widest mb-2">Teléfono</label>
                    <input required type="tel" id="phone" value={formData.phone} onChange={handleChange} className="w-full border border-black/10 bg-black/5 rounded-none px-4 py-3 focus:outline-none focus:bg-white focus:ring-1 focus:ring-gold-400 transition-colors" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 border border-black/10 shadow-sm space-y-6">
              <h2 className="text-sm font-medium text-black uppercase tracking-widest border-b border-black/10 pb-4">Método de Pago</h2>
              <div className="grid grid-cols-1 gap-4">
                <label className={`flex items-center p-4 border cursor-pointer transition-colors ${formData.paymentMethod === 'transfer' ? 'border-gold-400 bg-gold-400/5' : 'border-black/10 hover:bg-black/5'}`}>
                  <input type="radio" name="paymentMethod" value="transfer" checked={formData.paymentMethod === 'transfer'} onChange={handleChange} className="sr-only" />
                  <CreditCard className={`mr-4 ${formData.paymentMethod === 'transfer' ? 'text-gold-500' : 'text-black/40'}`} />
                  <div>
                    <p className="text-sm font-medium text-black uppercase tracking-widest">Transferencia Bancaria</p>
                    <p className="text-xs text-black/60 font-light mt-1">Envíanos el comprobante por WhatsApp</p>
                  </div>
                </label>

                <label className={`flex items-center p-4 border cursor-pointer transition-colors ${formData.paymentMethod === 'cash' ? 'border-gold-400 bg-gold-400/5' : 'border-black/10 hover:bg-black/5'}`}>
                  <input type="radio" name="paymentMethod" value="cash" checked={formData.paymentMethod === 'cash'} onChange={handleChange} className="sr-only" />
                  <Wallet className={`mr-4 ${formData.paymentMethod === 'cash' ? 'text-gold-500' : 'text-black/40'}`} />
                  <div>
                    <p className="text-sm font-medium text-black uppercase tracking-widest">Efectivo al recibir</p>
                    <p className="text-xs text-black/60 font-light mt-1">Paga en efectivo cuando recibas tu pedido</p>
                  </div>
                </label>
              </div>
            </div>

            <button type="submit" className="w-full bg-black text-white py-4 text-xs uppercase tracking-widest hover:bg-gold-500 hover:text-black transition-colors duration-300">
              Confirmar Pedido vía WhatsApp ({formatDOP(totalPrice)})
            </button>
          </form>
        </div>
        
        {/* Resumen */}
        <div className="w-full lg:w-96">
          <div className="bg-black/5 p-8 border border-black/10 sticky top-24">
            <h2 className="text-sm font-medium text-black uppercase tracking-widest border-b border-black/10 pb-4 mb-6">Resumen del Pedido</h2>
            <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
              {items.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-20 bg-white shrink-0">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-xs font-medium text-black uppercase tracking-widest mb-1 line-clamp-1">{item.name}</h3>
                    <p className="text-black/60 font-light text-xs mb-1">Cant: {item.quantity}</p>
                    <p className="text-gold-500 font-light text-sm">{formatDOP(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-black/10 pt-4 space-y-4">
              <div className="flex justify-between text-black/70 text-sm font-light">
                <span>Subtotal</span>
                <span>{formatDOP(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-black/70 text-sm font-light">
                <span>Envío</span>
                <span>Gratis</span>
              </div>
              <div className="border-t border-black/10 pt-4 flex justify-between text-black text-lg font-medium">
                <span className="uppercase text-sm tracking-widest flex items-center">Total</span>
                <span>{formatDOP(totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
