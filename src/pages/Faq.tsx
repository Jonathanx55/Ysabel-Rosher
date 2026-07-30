import { Link } from "react-router-dom";

export function Faq() {
  const faqs = [
    {
      q: "¿Cuáles son los métodos de pago aceptados?",
      a: "Aceptamos todas las tarjetas de crédito principales, PayPal y transferencias bancarias."
    },
    {
      q: "¿Cuánto tarda el envío?",
      a: "El envío estándar toma de 3 a 5 días hábiles. El envío exprés toma de 1 a 2 días hábiles."
    },
    {
      q: "¿Puedo devolver un artículo?",
      a: "Sí, aceptamos devoluciones dentro de los 30 días posteriores a la compra, siempre y cuando el artículo esté sin usar y con sus etiquetas originales."
    },
    {
      q: "¿Hacen envíos internacionales?",
      a: "Realizamos envios solo en República Dominicana."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif text-black mb-6 uppercase tracking-widest">Preguntas Frecuentes</h1>
        <div className="w-16 h-px bg-gold-400 mx-auto"></div>
      </div>
      
      <div className="space-y-8">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-black/10 pb-6">
            <h3 className="text-lg font-medium text-black uppercase tracking-widest text-sm mb-3">{faq.q}</h3>
            <p className="text-black/70 leading-relaxed font-light">{faq.a}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-16 p-12 bg-black/5 border border-black/10 text-center">
        <h3 className="text-xl font-serif text-black mb-4 uppercase tracking-widest">¿No encuentras tu respuesta?</h3>
        <p className="text-black/70 mb-8 font-light">Nuestro equipo de soporte está aquí para ayudarte.</p>
        <Link to="/contact" className="inline-block bg-black text-white px-8 py-4 rounded-none text-xs uppercase tracking-widest hover:bg-gold-500 hover:text-black transition-colors duration-300">
          Contáctanos
        </Link>
      </div>
    </div>
  );
}
