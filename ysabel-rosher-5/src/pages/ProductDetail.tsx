import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { PRODUCTS, ProductMedia } from "../data/products";

const formatDOP = (price: number) => {
  return new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP', minimumFractionDigits: 0 }).format(price);
};

export function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === Number(id)) || PRODUCTS[0];
  const { addToCart } = useCart();
  
  const hasMedia = product.media && product.media.length > 0;
  const [activeMedia, setActiveMedia] = useState<ProductMedia | null>(hasMedia ? product.media![0] : { type: 'image', url: product.img });
  
  return (
    <>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row gap-16">
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        <div className="aspect-[4/5] bg-black/5 overflow-hidden relative">
          {activeMedia?.type === 'video' ? (
            <video 
              src={activeMedia.url} 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover"
            />
          ) : (
            <img 
              src={activeMedia?.url || product.img} 
              alt={product.name} 
              className="w-full h-full object-cover" 
            />
          )}
        </div>
        
        {/* Thumbnails Gallery */}
        {hasMedia && product.media!.length > 1 && (
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {product.media!.map((m, idx) => (
              <button
                key={idx}
                onClick={() => setActiveMedia(m)}
                className={`flex-shrink-0 w-20 h-24 bg-black/5 overflow-hidden border-2 transition-colors ${activeMedia?.url === m.url ? 'border-gold-400' : 'border-transparent hover:border-black/20'}`}
              >
                {m.type === 'video' ? (
                  <div className="w-full h-full bg-black/10 flex items-center justify-center relative">
                    <video src={m.url} className="w-full h-full object-cover opacity-50" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-white/80 flex items-center justify-center">
                        <div className="w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-black border-b-4 border-b-transparent ml-1"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <img src={m.url} alt={`${product.name} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="w-full md:w-1/2 flex flex-col pt-8">
        <h1 className="text-3xl font-serif text-black mb-2 tracking-widest uppercase">{product.name}</h1>
        <p className="text-xl text-gold-500 mb-8 font-light">{formatDOP(product.price)}</p>
        
        <p className="text-black/70 mb-10 leading-relaxed text-sm font-light">
          {product.desc}
        </p>
        
        <button 
          onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, img: product.img })}
          className="bg-black text-gold-400 w-full py-4 uppercase tracking-widest text-sm hover:bg-gold-500 hover:text-black transition-colors mb-6"
        >
          Añadir al Carrito
        </button>
        
        <div className="mt-8 pt-8 border-t border-black/10">
          <div className="flex gap-8 text-xs uppercase tracking-widest">
            <Link to="/catalog" className="text-black/60 hover:text-gold-500 transition-colors border-b border-transparent hover:border-gold-500 pb-1">
              Volver al Catálogo
            </Link>
            <Link to="/contact" className="text-black/60 hover:text-gold-500 transition-colors border-b border-transparent hover:border-gold-500 pb-1">
              Soporte
            </Link>
          </div>
        </div>
      </div>
    </div>
    
    {/* Productos Relacionados */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-black/10">
      <h2 className="text-2xl font-serif text-black uppercase tracking-widest mb-10 text-center">También te podría interesar</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {PRODUCTS.filter(p => p.id !== product.id).slice(0, 4).map((relatedProduct) => (
          <Link key={relatedProduct.id} to={`/product/${relatedProduct.id}`} className="group block">
            <div className="aspect-[4/5] overflow-hidden bg-black/5 mb-4">
              <img src={relatedProduct.img} alt={relatedProduct.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <h3 className="text-xs font-medium text-black uppercase tracking-widest mb-1 group-hover:text-gold-500 transition-colors line-clamp-1">{relatedProduct.name}</h3>
            <p className="text-black/60 font-light text-sm">{formatDOP(relatedProduct.price)}</p>
          </Link>
        ))}
      </div>
    </div>
    </>
  );
}
