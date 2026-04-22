'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/lib/cart';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(s => s.addItem);
  const image = product.images?.[0]?.src || 'https://via.placeholder.com/300x300?text=No+Image';
  const price = parseFloat(product.price) || 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      product_id: product.id,
      name: product.name,
      price,
      quantity: 1,
      image,
      sku: product.sku,
    });
  };

  return (
    <Link href={`/product/${product.slug}`} className="card group flex flex-col">
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        {loading && <div className="skeleton absolute inset-0" />}
        <Image
          src={image}
          alt={product.name}
          fill
          className={`object-cover transition-transform duration-300 group-hover:scale-105 ${loading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setLoading(false)}
          unoptimized
        />
        {product.on_sale && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
            SALE
          </span>
        )}
        {product.stock_status === 'outofstock' && (
          <span className="absolute top-2 right-2 bg-gray-500 text-white text-xs font-bold px-2 py-0.5 rounded">
            Out of Stock
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-gray-500 mb-1 truncate">{product.sku}</p>
        <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 flex-1">{product.name}</h3>
        <div className="flex items-center justify-between mt-2">
          <div>
            {product.on_sale && product.sale_price && (
              <span className="text-sm text-gray-400 line-through mr-2">${product.regular_price}</span>
            )}
            <span className="font-bold text-primary-600">${product.price}</span>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={product.stock_status === 'outofstock'}
            className="text-sm bg-primary-500 text-white px-3 py-1.5 rounded-lg hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </Link>
  );
}