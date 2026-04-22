'use client';

import Image from 'next/image';
import { useCartStore } from '@/lib/cart';
import type { CartItem } from '@/lib/types';

export default function CartItem({ item }: { item: CartItem }) {
  const updateQuantity = useCartStore(s => s.updateQuantity);
  const removeItem = useCartStore(s => s.removeItem);

  return (
    <div className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
        <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-800 text-sm mb-1">{item.name}</h3>
        <p className="text-xs text-gray-500 mb-2">SKU: {item.sku}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm font-medium">-</button>
            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm font-medium">+</button>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-primary-600">${(item.price * item.quantity).toFixed(2)}</span>
            <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}