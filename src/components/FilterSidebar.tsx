'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import type { Category } from '@/lib/types';

interface FilterSidebarProps {
  categories: Category[];
  totalProducts: number;
}

export default function FilterSidebar({ categories, totalProducts }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  const selectedCat = searchParams.get('category') || '';
  const sort = searchParams.get('orderby') || 'date';
  const search = searchParams.get('search') || '';

  const applyFilters = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => {
      if (v) params.set(k, v); else params.delete(k);
    });
    params.delete('page');
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
      {/* Search result count */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <p className="text-sm text-gray-500">{totalProducts} products found</p>
      </div>

      {/* Category filter */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-3">Categories</h3>
        <div className="space-y-2">
          <button
            onClick={() => applyFilters({ category: '' })}
            className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${!selectedCat ? 'bg-primary-50 text-primary-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            All Products
          </button>
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => applyFilters({ category: String(c.id) })}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-sm flex justify-between transition-colors ${selectedCat === String(c.id) ? 'bg-primary-50 text-primary-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <span className="truncate">{c.name}</span>
              <span className="text-xs text-gray-400 ml-2">({c.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-3">Price Range</h3>
        <div className="flex items-center gap-2">
          <input type="number" placeholder="Min" value={priceMin} onChange={e => setPriceMin(e.target.value)} className="input-field text-sm" />
          <span className="text-gray-400">-</span>
          <input type="number" placeholder="Max" value={priceMax} onChange={e => setPriceMax(e.target.value)} className="input-field text-sm" />
        </div>
        <button
          onClick={() => applyFilters({})}
          className="btn-secondary w-full mt-3 text-sm"
        >
          Apply
        </button>
      </div>

      {/* Sort */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-3">Sort By</h3>
        <select
          value={sort}
          onChange={e => applyFilters({ orderby: e.target.value })}
          className="input-field text-sm"
        >
          <option value="date">Newest First</option>
          <option value="price">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="title">Name: A-Z</option>
          <option value="title-desc">Name: Z-A</option>
        </select>
      </div>
    </aside>
  );
}