const soapImgUrl = "https://raw.githubusercontent.com/Jonathanx55/Ysabel-Rosher/main/src/assets/images/jabones.png";
const perfumeImgUrl = "https://raw.githubusercontent.com/Jonathanx55/Ysabel-Rosher/main/src/assets/images/Perfume.png";
const candleImgUrl = "https://raw.githubusercontent.com/Jonathanx55/Ysabel-Rosher/main/src/assets/images/Vela.png";
const ositoImgUrl = "https://raw.githubusercontent.com/Jonathanx55/Ysabel-Rosher/main/src/assets/images/Osito.png";
const perfumeGrandeImgUrl = "https://raw.githubusercontent.com/Jonathanx55/Ysabel-Rosher/main/src/assets/images/Perfume-Grande.png";

export interface ProductMedia {
  type: 'image' | 'video';
  url: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  img: string; // main image
  desc: string;
  media?: ProductMedia[]; // optional additional media
}

export const PRODUCTS: Product[] = [
  { id: 1, name: "Jabón Artesanal de Avena y Miel", price: 700, category: "Jabones", img: soapImgUrl, desc: "Un jabón suave y cremoso elaborado a mano con avena exfoliante y miel nutritiva. Ideal para pieles sensibles y secas, proporcionando una hidratación profunda.", media: [{ type: 'image', url: soapImgUrl }] },
  { id: 2, name: "Perfume Signature Ysabel Rosher", price: 2600, category: "Perfumes", img: perfumeImgUrl, desc: "Nuestra fragancia insignia, una mezcla cautivadora de notas florales y toques amaderados, diseñada para dejar una impresión inolvidable.", media: [{ type: 'image', url: perfumeImgUrl }] },
  { id: 3, name: "Vela Aromática Premium", price: 1450, category: "Velas", img: candleImgUrl, desc: "Vela vertida a mano con cera de soja natural. Su aroma relajante transforma cualquier espacio en un santuario de paz y tranquilidad.", media: [{ type: 'image', url: candleImgUrl }] },
  { id: 5, name: "Osito Aromático de Rosas", price: 1300, category: "Esencias", img: ositoImgUrl, desc: "Hermoso osito aromático artesanal con delicada esencia de rosas. Perfecto para decorar y perfumar suavemente cualquier rincón de tu hogar.", media: [{ type: 'image', url: ositoImgUrl }] },
  { id: 13, name: "Perfume Gran Reserva", price: 3500, category: "Perfumes", img: perfumeGrandeImgUrl, desc: "Nuestra creación más exclusiva, presentada en un frasco elegante. Un aroma intenso y sofisticado, perfecto para ocasiones especiales y para quienes buscan dejar una huella imborrable.", media: [{ type: 'image', url: perfumeGrandeImgUrl }] }
];
