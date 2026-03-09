export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  oldPrice?: number;
  image: string;
  sizes: string[];
  color?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'camiseta-preta',
    slug: 'camiseta-preta',
    name: 'Camiseta Comunicação Preta',
    shortDescription: 'O clássico indispensável para o ministério.',
    fullDescription: 'Camiseta oficial do Ministério de Comunicação da IAP Barreirinha na cor preta. Tecido premium de alta durabilidade e conforto.',
    price: 78.00,
    image: 'https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/PEDRO%20E%20SARA%20-%20COSTAS%20E%20FRENTE.jpg',
    sizes: ['PP', 'P', 'M', 'G', 'GG', 'XGG'],
    color: 'preta'
  },
  {
    id: 'camiseta-branca',
    slug: 'camiseta-branca',
    name: 'Camiseta Comunicação Branca',
    shortDescription: 'Leveza e modernidade para o dia a dia.',
    fullDescription: 'Camiseta oficial do Ministério de Comunicação da IAP Barreirinha na cor branca. Visual clean e elegante.',
    price: 78.00,
    image: 'https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_180559.jpg',
    sizes: ['PP', 'P', 'M', 'G', 'GG', 'XGG'],
    color: 'branca'
  },
  {
    id: 'kit-promocional',
    slug: 'kit-promocional',
    name: 'Promoção Especial (2 Peças)',
    shortDescription: 'O melhor custo-benefício para sua equipe.',
    fullDescription: 'Leve duas unidades e garanta 10% de desconto. Identidade e unidade para todo o time.',
    price: 140.40,
    oldPrice: 156.00,
    image: 'https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_180837.jpg',
    sizes: ['PP', 'P', 'M', 'G', 'GG', 'XGG']
  }
];

export const getProductBySlug = (slug: string) => PRODUCTS.find(p => p.slug === slug);
