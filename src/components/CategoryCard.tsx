'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Category } from '@/lib/types';

const BRAND_COLORS: Record<string, string> = {
  'For Ecovacs': 'bg-blue-600',
  'For Roborock': 'bg-blue-500',
  'For Tineco': 'bg-orange-500',
  'For Bissell': 'bg-red-500',
  'For Eufy': 'bg-gray-700',
  'For Karcher': 'bg-yellow-500',
  'For Qihoo': 'bg-green-600',
  'For Shark': 'bg-gray-600',
};

export default function CategoryCard({ category }: { category: Category }) {
  const bgClass = BRAND_COLORS[category.name] || 'bg-primary-500';
  const initial = category.name.replace('For ', '').charAt(0);

  return (
    <Link href={`/shop/${category.slug}`} className="card group p-4 flex items-center gap-4">
      <div className={`w-14 h-14 ${bgClass} rounded-full flex items-center justify-center flex-shrink-0`}>
        <span className="text-white text-xl font-bold">{initial}</span>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-800 group-hover:text-primary-500 transition-colors truncate">
          {category.name}
        </h3>
        <p className="text-sm text-gray-500">{category.count} products</p>
      </div>
      <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}