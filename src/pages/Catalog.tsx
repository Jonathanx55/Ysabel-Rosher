import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PRODUCTS } from "../data/products";

const CATEGORIES = ["Todos", "Jabones", "Perfumes", "Velas", "Cuidado Personal", "Esencias", "Ambiente"];

const formatDOP = (price: number) => {
  return new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP', minimumFractionDigits: 0 }).format(price);
};

export function Catalog() {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(location.state?.category || "Todos");
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    if (location.state?.category) {
      setActiveCategory(location.state.category);
    }
  }, [location.state]);

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, maxPrice]);

  const filteredProducts = PRODUCTS.filter(product => {
    const categoryMatch = activeCategory === "Todos" || product.category === activeCategory;
    const priceMatch = product.price <= maxPrice;
    return categoryMatch && priceMatch;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-serif text-black mb-4 uppercase tracking-widest">Colección Completa</h1>
        <div className="w-16 h-px bg-gold-400 mx-auto mb-4"></div>
        <p className="text-black/60 font-light">Mostrando {filteredProducts.length} productos de esencia y bienestar</p>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col items-center gap-8 mb-12">
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-xs uppercase tracking-widest transition-colors duration-300 border ${
                activeCategory === category 
                  ? 'bg-black text-gold-400 border-black' 
                  : 'bg-white text-black/70 border-black/10 hover:border-gold-400 hover:text-black'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center gap-2 w-full max-w-xs">
          <label htmlFor="price-range" className="text-xs uppercase tracking-widest text-black/70 flex justify-between w-full">
            <span>Precio Máximo</span>
            <span className="font-medium">{formatDOP(maxPrice)}</span>
          </label>
          <input 
            type="range" 
            id="price-range"
            min="0" 
            max="3000" 
            step="100"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full h-1 bg-black/10 rounded-none appearance-none cursor-pointer accent-gold-400"
          />
        </div>
      </div>
      
      {/* Product Grid */}
      <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 mb-16">
        <AnimatePresence mode="popLayout">
          {paginatedProducts.map(product => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Link to={`/product/${product.id}`} className="group block">
                <div className="relative aspect-[4/5] mb-4 overflow-hidden bg-black/5">
                  <img 
                    src={product.img} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <h3 className="text-sm text-black font-medium tracking-wide mb-1 group-hover:text-gold-500 transition-colors line-clamp-1">{product.name}</h3>
                <p className="text-black/70 text-sm font-light">{formatDOP(product.price)}</p>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 border border-black/10 disabled:opacity-30 hover:border-gold-400 hover:text-gold-500 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`w-10 h-10 flex items-center justify-center text-xs border transition-colors duration-300 ${
                    currentPage === pageNumber
                      ? 'bg-black text-gold-400 border-black'
                      : 'bg-white text-black/70 border-black/10 hover:border-gold-400'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>

          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 border border-black/10 disabled:opacity-30 hover:border-gold-400 hover:text-gold-500 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
