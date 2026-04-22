import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import { getProductBySlug, getRelatedProducts } from '@/lib/woocommerce';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.name,
    description: product.short_description?.replace(/<[^>]+>/g, '') || product.name,
    openGraph: {
      images: product.images?.[0]?.src ? [{ url: product.images[0].src }] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const related = await getRelatedProducts(
    product.id,
    product.categories?.map(c => c.id) || []
  );

  const images = product.images?.length ? product.images : [{ id: 0, src: 'https://via.placeholder.com/600x600?text=No+Image', name: 'No Image', alt: '' }];
  const mainImage = images[0].src;

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <nav className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:text-primary-500">Home</a>
          <span className="mx-2">/</span>
          <a href="/shop" className="hover:text-primary-500">Shop</a>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image gallery */}
          <div className="space-y-3">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
              <Image src={mainImage} alt={product.name} fill className="object-contain" unoptimized />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {images.map(img => (
                  <div key={img.id} className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <Image src={img.src} alt={img.alt || product.name} fill className="object-cover" unoptimized />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div>
            <p className="text-sm text-gray-500 mb-1">SKU: {product.sku}</p>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>

            {/* Price */}
            <div className="mb-6">
              {product.on_sale && product.sale_price && (
                <span className="text-lg text-gray-400 line-through mr-3">${product.regular_price}</span>
              )}
              <span className="text-3xl font-bold text-primary-600">${product.price}</span>
              {product.on_sale && <span className="ml-2 bg-red-500 text-white text-sm px-2 py-0.5 rounded">SALE</span>}
            </div>

            {/* Stock status */}
            <div className="flex items-center gap-2 mb-6">
              {product.stock_status === 'instock' ? (
                <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span> In Stock
                </span>
              ) : (
                <span className="flex items-center gap-1 text-red-500 text-sm font-medium">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span> Out of Stock
                </span>
              )}
              {product.stock_quantity && (
                <span className="text-sm text-gray-500">({product.stock_quantity} available)</span>
              )}
            </div>

            {/* Add to cart form */}
            <AddToCartForm productId={product.id} price={parseFloat(product.price)} name={product.name} image={mainImage} stockStatus={product.stock_status} />

            {/* Description */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-3">Description</h2>
              <div className="prose prose-sm max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>
            <ProductGrid products={related} />
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

function AddToCartForm({ productId, price, name, image, stockStatus }: { productId: number; price: number; name: string; image: string; stockStatus: string }) {
  'use client';
  return <div />; // placeholder — client component below
}