'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/cart';
import { useRouter } from 'next/navigation';

interface Props {
  productId: number;
  price: number;
  name: string;
  image: string;
  stockStatus: string;
}

export default function AddToCartForm({ productId, price, name, image, stockStatus }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore(s => s.addItem);
  const router = useRouter();
  const outOfStock = stockStatus === 'outofstock';

  const handleAdd = () => {
    addItem({ id: productId, product_id: productId, name, price, quantity, image, sku: '' });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-4">
      {!outOfStock && (
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">Quantity:</label>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-gray-100 text-sm font-medium">-</button>
            <input type="number" min="1" value={quantity} onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-14 text-center border-0 focus:outline-none text-sm" />
            <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-2 hover:bg-gray-100 text-sm font-medium">+</button>
          </div>
        </div>
      )}
      <div className="flex gap-3">
        <button
          onClick={handleAdd}
          disabled={outOfStock}
          className="flex-1 bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {outOfStock ? 'Out of Stock' : added ? '✓ Added to Cart!' : 'Add to Cart'}
        </button>
        <button
          onClick={() => router.push('/cart')}
          className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
        >
          View Cart
        </button>
      </div>
    </div>
  );
}