
export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  price: string;
  oldPrice?: string;
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
    price: '59,90',
    image: 'https://picsum.photos/seed/iap-black/800/1000',
    sizes: ['PP', 'P', 'M', 'G', 'GG', 'XGG'],
    color: 'preta'
  },
  {
    id: 'camiseta-branca',
    slug: 'camiseta-branca',
    name: 'Camiseta Comunicação Branca',
    shortDescription: 'Leveza e modernidade para o dia a dia.',
    fullDescription: 'Camiseta oficial do Ministério de Comunicação da IAP Barreirinha na cor branca. Visual clean e elegante.',
    price: '59,90',
    image: 'https://picsum.photos/seed/iap-white/800/1000',
    sizes: ['PP', 'P', 'M', 'G', 'GG', 'XGG'],
    color: 'branca'
  },
  {
    id: 'kit-promocional',
    slug: 'kit-promocional',
    name: 'Kit Promocional (2 Peças)',
    shortDescription: 'O melhor custo-benefício para sua equipe.',
    fullDescription: 'Leve duas unidades e garanta um desconto especial. Você pode escolher as cores no momento da reserva.',
    price: '109,90',
    oldPrice: '119,80',
    image: 'https://picsum.photos/seed/iap-kit/800/1000',
    sizes: ['PP', 'P', 'M', 'G', 'GG', 'XGG']
  }
];

export const getProductBySlug = (slug: string) => PRODUCTS.find(p => p.slug === slug);
