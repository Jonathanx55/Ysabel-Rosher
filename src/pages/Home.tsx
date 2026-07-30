import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="flex flex-col bg-white">
      {/* Hero Section */}
      <div className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden bg-black">
        <img src="https://raw.githubusercontent.com/Jonathanx55/Ysabel-Rosher/main/src/assets/images/Imagen%20Principal.png" alt="Hero Banner" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/40 md:bg-black/30"></div>
        
        {/* Text Overlay for both Mobile and Desktop */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto mt-[-10vh] md:mt-0">
          <h1 className="text-4xl md:text-7xl font-serif text-white mb-4 md:mb-6 tracking-wide drop-shadow-lg">
            Esencias y Detalles <span className="text-gold-400">Artesanales</span>
          </h1>
          <p className="text-base md:text-xl text-white/95 max-w-2xl mx-auto mb-8 md:mb-10 font-light drop-shadow-md px-2">
            Ysabel Rosher ofrece una exclusiva colección de productos artesanales de alta calidad, cuidadosamente elaborados para el cuidado de la piel y la creación de ambientes únicos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-xs sm:max-w-none mx-auto">
            <Link to="/catalog" className="bg-gold-400 text-black px-8 py-4 rounded-none text-sm uppercase tracking-widest hover:bg-gold-500 transition-colors duration-300 shadow-lg w-full sm:w-auto text-center">
              Ver Catálogo
            </Link>
            <Link to="/about" className="bg-transparent border border-white text-white px-8 py-4 rounded-none text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300 shadow-lg w-full sm:w-auto text-center">
              Conócenos
            </Link>
          </div>
        </div>
      </div>
      
      {/* Featured Categories */}
      <div className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif text-black mb-4 uppercase tracking-widest">Colección Esencial</h2>
          <div className="w-16 h-px bg-gold-400 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/catalog" state={{ category: "Perfumes" }} className="group block relative overflow-hidden aspect-[3/4]">
              <img src="https://raw.githubusercontent.com/Jonathanx55/Ysabel-Rosher/main/src/assets/images/Perfume.png" alt="Perfumes" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
              <div className="absolute inset-0 border-[1px] border-white/30 m-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute bottom-8 left-0 right-0 text-center z-10">
                <span className="bg-white/90 backdrop-blur-sm text-black px-8 py-3 text-xs uppercase tracking-widest inline-block shadow-sm group-hover:bg-gold-400 group-hover:text-black transition-colors duration-300">Perfumes</span>
              </div>
            </Link>
            <Link to="/catalog" state={{ category: "Esencias" }} className="group block relative overflow-hidden aspect-[3/4]">
              <img src="https://raw.githubusercontent.com/Jonathanx55/Ysabel-Rosher/main/src/assets/images/Osito.png" alt="Esencias Aromáticas" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
              <div className="absolute inset-0 border-[1px] border-white/30 m-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute bottom-8 left-0 right-0 text-center z-10">
                <span className="bg-white/90 backdrop-blur-sm text-black px-8 py-3 text-xs uppercase tracking-widest inline-block shadow-sm group-hover:bg-gold-400 group-hover:text-black transition-colors duration-300">Esencias</span>
              </div>
            </Link>
            <Link to="/catalog" state={{ category: "Velas" }} className="group block relative overflow-hidden aspect-[3/4]">
              <img src="https://raw.githubusercontent.com/Jonathanx55/Ysabel-Rosher/main/src/assets/images/Vela.png" alt="Velas Aromáticas" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
              <div className="absolute inset-0 border-[1px] border-white/30 m-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute bottom-8 left-0 right-0 text-center z-10">
                <span className="bg-white/90 backdrop-blur-sm text-black px-8 py-3 text-xs uppercase tracking-widest inline-block shadow-sm group-hover:bg-gold-400 group-hover:text-black transition-colors duration-300">Velas</span>
              </div>
            </Link>
        </div>
      </div>
      
      {/* Brand Value */}
      <div className="bg-stone-100 py-32 relative overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>
        
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-serif text-stone-900 mb-6 tracking-widest uppercase">El Arte del Bienestar</h2>
          <p className="text-stone-600 leading-relaxed mb-10 text-lg font-light">
            Cada producto de <span className="text-gold-600 font-serif font-medium">Ysabel Rosher</span> es una declaración de cuidado y conexión. 
            Trabajamos con los mejores ingredientes naturales para asegurar que nuestras esencias no solo cautiven, 
            sino que perduren y enriquezcan tus momentos más íntimos.
          </p>
          <Link to="/about" className="inline-block border-b border-gold-600 text-gold-600 pb-1 text-xs uppercase tracking-widest hover:text-stone-900 hover:border-stone-900 transition-colors duration-300">
            Descubre Nuestra Historia
          </Link>
        </div>
      </div>
    </div>
  );
}
