
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
    price: 79.90,
    image: 'https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/PEDRO%20E%20SARA%20-%20COSTAS%20E%20FRENTE.jpg',
    sizes: ['PP', 'P', 'M', 'G', 'GG', 'XGG'],
    color: 'preta'
  },
  {
    id: 'camiseta-off-white',
    slug: 'camiseta-off-white',
    name: 'Camiseta Comunicação Off-White',
    shortDescription: 'Leveza e modernidade para o dia a dia.',
    fullDescription: 'Camiseta oficial do Ministério de Comunicação da IAP Barreirinha na cor off-white. Visual clean e elegante.',
    price: 79.90,
    image: 'https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/20260307_180559.jpg',
    sizes: ['PP', 'P', 'M', 'G', 'GG', 'XGG'],
    color: 'off-white'
  },
  {
    id: 'kit-promocional',
    slug: 'kit-promocional',
    name: 'Promoção Especial (2 Peças)',
    shortDescription: 'O melhor custo-benefício para sua equipe.',
    fullDescription: 'Leve duas unidades e garanta o valor promocional. Identidade e unidade para todo o time.',
    price: 139.90,
    oldPrice: 159.80,
    image: 'https://ik.imagekit.io/q0yw2qaik/Camiseta%20IAP%20BARREIRINHA/PEDRO%20E%20SARA%20-%20COSTAS%20E%20FRENTE.jpg',
    sizes: ['PP', 'P', 'M', 'G', 'GG', 'XGG']
  }
];

export const getProductBySlug = (slug: string) => PRODUCTS.find(p => p.slug === slug);
