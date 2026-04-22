'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import ProductGrid from '@/components/ProductGrid';
import type { Product } from '@/lib/types';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [copied, setCopied] = useState(false);

  const removeFromWishlist = (id: number) => {
    setWishlist(w => w.filter(p => p.id !== id));
  };

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Wishlist</h1>
        {wishlist.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg mb-6">Your wishlist is empty.</p>
            <Link href="/shop" className="btn-primary inline-block">Browse Products</Link>
          </div>
        ) : (
          <ProductGrid products={wishlist} />
        )}
      </main>
      <Footer />
    </>
  );
}