
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden border-none shadow-md transition-all hover:shadow-xl bg-card">
      <Link href={`/produto/${product.slug}`}>
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform hover:scale-105"
            data-ai-hint="t-shirt product"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <h3 className="font-headline text-lg font-bold leading-tight mb-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
          {product.shortDescription}
        </p>
        <p className="font-headline text-xl font-black">R$ {product.price}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full font-bold" variant="default">
          <Link href={`/produto/${product.slug}`}>Ver Produto</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
