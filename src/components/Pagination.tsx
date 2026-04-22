'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null;
  const searchParams = useSearchParams();

  const buildUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    return `/shop?${params.toString()}`;
  };

  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      {currentPage > 1 && (
        <Link href={buildUrl(currentPage - 1)} className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors text-sm">
          &larr;
        </Link>
      )}
      {pages.map(p => (
        <Link key={p} href={buildUrl(p)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${p === currentPage ? 'bg-primary-500 text-white' : 'border border-gray-300 text-gray-600 hover:bg-gray-50'}`}>
          {p}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link href={buildUrl(currentPage + 1)} className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors text-sm">
          &rarr;
        </Link>
      )}
    </div>
  );
}