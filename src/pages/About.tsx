import aboutImg from "../assets/images/artisanal_workshop_1785277605178.jpg";

export function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif text-black mb-6 uppercase tracking-widest">Nuestra Historia</h1>
        <div className="w-16 h-px bg-gold-400 mx-auto"></div>
      </div>
      <div className="mx-auto text-lg text-black/70 leading-relaxed font-light">
        <p className="mb-8">
          Ysabel Rosher nació de una profunda conexión con la naturaleza y el deseo de llevar el bienestar al hogar. 
          Fundada en 2025, nuestra marca se ha dedicado a crear productos artesanales que purifican, armonizan 
          y elevan tus espacios y rituales diarios.
        </p>
        <p className="mb-12">
          Creemos que el cuidado personal es una forma de expresión y amor propio. Por eso, cada una de nuestras 
          creaciones está elaborada a mano con meticulosa atención al detalle. Trabajamos con ingredientes 
          naturales, botánicos seleccionados y aceites esenciales puros para asegurar que cada 
          esencia, vela y jabón ofrezca una experiencia sensorial única y transformadora.
        </p>
        
        <div className="w-full aspect-[21/9] my-16 overflow-hidden bg-black/5">
          <img src={aboutImg} alt="Nuestro taller artesanal" className="w-full h-full object-cover" />
        </div>
        
        <p className="text-center italic text-xl font-serif text-black mb-8 px-4">
          "El verdadero bienestar se encuentra en la sutileza de los aromas y la pureza de la naturaleza."
        </p>
        
        <p className="text-center mb-8">
          Te invitamos a explorar nuestras colecciones y a ser parte de la familia Ysabel Rosher. 
        </p>
      </div>
    </div>
  );
}
