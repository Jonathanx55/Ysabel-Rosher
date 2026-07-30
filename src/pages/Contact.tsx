import { Link } from "react-router-dom";

export function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row gap-16">
      <div className="w-full md:w-1/2">
        <h1 className="text-4xl font-serif text-black mb-6 uppercase tracking-widest">Contacto</h1>
        <div className="w-16 h-px bg-gold-400 mb-6"></div>
        <p className="text-lg text-black/70 mb-8 font-light">
          ¿Tienes alguna pregunta o comentario? Estamos aquí para ayudarte. 
          Llena el formulario y nos pondremos en contacto contigo lo antes posible.
        </p>
        <div className="space-y-6 text-black/70 font-light">
          <p><strong className="font-medium text-black uppercase tracking-wider text-xs block mb-1">Email:</strong>Jeycyjay@gmail.com</p>
          <p><strong className="font-medium text-black uppercase tracking-wider text-xs block mb-1">Teléfono:</strong>849-210-2243</p>
          <p><strong className="font-medium text-black uppercase tracking-wider text-xs block mb-1">Dirección:</strong>Altos de loyola, Santo Domimgo Oeste, Rep.Dom. Tienda Virtual</p>
        </div>
        
        <div className="mt-8 pt-8 border-t border-black/10">
          <h3 className="text-xl font-serif text-black mb-4 uppercase tracking-widest">Preguntas Frecuentes</h3>
          <p className="text-black/70 mb-4 font-light">
            Quizás tu duda ya esté resuelta en nuestra sección de preguntas frecuentes.
          </p>
          <Link to="/faq" className="inline-block border-b border-black text-black pb-1 text-xs uppercase tracking-widest hover:text-gold-500 hover:border-gold-500 transition-colors duration-300">Ver FAQ</Link>
        </div>
      </div>
      
      <div className="w-full md:w-1/2">
        <form className="bg-white p-8 border border-black/10 shadow-xl flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="name" className="block text-xs font-medium text-black uppercase tracking-widest mb-2">Nombre Completo</label>
            <input type="text" id="name" className="w-full border border-black/10 bg-white rounded-none px-4 py-3 focus:outline-none focus:ring-1 focus:ring-gold-400 focus:border-gold-400 transition-colors" />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-black uppercase tracking-widest mb-2">Correo Electrónico</label>
            <input type="email" id="email" className="w-full border border-black/10 bg-white rounded-none px-4 py-3 focus:outline-none focus:ring-1 focus:ring-gold-400 focus:border-gold-400 transition-colors" />
          </div>
          <div>
            <label htmlFor="message" className="block text-xs font-medium text-black uppercase tracking-widest mb-2">Mensaje</label>
            <textarea id="message" rows={5} className="w-full border border-black/10 bg-white rounded-none px-4 py-3 focus:outline-none focus:ring-1 focus:ring-gold-400 focus:border-gold-400 transition-colors"></textarea>
          </div>
          <button type="submit" className="bg-black text-white w-full py-4 text-xs uppercase tracking-widest hover:bg-gold-500 hover:text-black transition-colors duration-300">
            Enviar Mensaje
          </button>
        </form>
      </div>
    </div>
  );
}
