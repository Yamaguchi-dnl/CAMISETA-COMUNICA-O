
export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  price: string;
  image: string;
  sizes: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'camiseta-modelo-1',
    slug: 'camiseta-modelo-1',
    name: 'Camiseta Comunicação - Versão 01',
    shortDescription: 'O modelo clássico do Ministério de Comunicação.',
    fullDescription: 'Camiseta oficial do Ministério de Comunicação da IAP Barreirinha. Desenvolvida com tecido de alta qualidade, garantindo conforto para o dia a dia e eventos da igreja. Estampa moderna e minimalista que representa nossa identidade.',
    price: '45,00',
    image: 'https://picsum.photos/seed/iap1/800/1000',
    sizes: ['PP', 'P', 'M', 'G', 'GG', 'XGG']
  },
  {
    id: 'camiseta-modelo-2',
    slug: 'camiseta-modelo-2',
    name: 'Camiseta Comunicação - Versão 02',
    shortDescription: 'Design alternativo com foco em identidade visual.',
    fullDescription: 'Uma opção diferenciada para a equipe de Comunicação. Este modelo traz elementos gráficos que destacam o papel da mídia na igreja. Perfeita para quem busca um visual moderno e impactante.',
    price: '50,00',
    image: 'https://picsum.photos/seed/iap2/800/1000',
    sizes: ['PP', 'P', 'M', 'G', 'GG', 'XGG']
  }
];

export const getProductBySlug = (slug: string) => PRODUCTS.find(p => p.slug === slug);
