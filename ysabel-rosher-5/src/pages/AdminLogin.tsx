import React from "react";
import { Link, useNavigate } from "react-router-dom";
const bgImage = "https://raw.githubusercontent.com/Jonathanx55/Ysabel-Rosher/main/src/assets/images/Fondo%20admin.png";

export function AdminLogin() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/admin/control');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={bgImage} alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="max-w-md w-full space-y-8 bg-white/95 backdrop-blur-sm p-10 rounded-none border border-gold-400/30 shadow-2xl relative z-10">
        <div>
          <h2 className="mt-2 text-center text-3xl font-serif text-black uppercase tracking-widest">
            Ysabel Rosher
          </h2>
          <div className="w-12 h-px bg-gold-400 mx-auto mt-4"></div>
          <p className="mt-4 text-center text-sm text-black/70 uppercase tracking-widest">
            Acceso Administrador
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="sr-only">Correo Electrónico</label>
              <input id="email-address" name="email" type="email" required className="appearance-none relative block w-full px-4 py-3 border border-black/10 placeholder-black/40 text-black bg-white rounded-none focus:outline-none focus:ring-1 focus:ring-gold-400 focus:border-gold-400 sm:text-sm transition-colors" placeholder="Correo Electrónico" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Contraseña</label>
              <input id="password" name="password" type="password" required className="appearance-none relative block w-full px-4 py-3 border border-black/10 placeholder-black/40 text-black bg-white rounded-none focus:outline-none focus:ring-1 focus:ring-gold-400 focus:border-gold-400 sm:text-sm transition-colors" placeholder="Contraseña" />
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-none text-white bg-black hover:bg-gold-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black uppercase tracking-widest transition-colors duration-300">
              Ingresar
            </button>
          </div>
        </form>
        <div className="text-center mt-6 pt-6 border-t border-black/10">
          <Link to="/" className="text-xs text-black/60 hover:text-gold-500 uppercase tracking-widest transition-colors">Volver a la tienda</Link>
        </div>
      </div>
    </div>
  );
}
