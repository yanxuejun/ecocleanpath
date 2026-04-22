import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import FilterSidebar from '@/components/FilterSidebar';
import Pagination from '@/components/Pagination';
import { getProducts, getCategories } from '@/lib/woocommerce';

export const metadata: Metadata = { title: 'Shop', description: 'Browse all robot vacuum accessories and replacement parts.' };

interface Props {
  searchParams: { page?: string; category?: string; search?: string; orderby?: string; order?: string };
}

export default async function ShopPage({ searchParams }: Props) {
  const page = parseInt(searchParams.page || '1');
  const [productsData, categories] = await Promise.all([
    getProducts({
      page,
      per_page: 12,
      category: searchParams.category,
      search: searchParams.search,
      orderby: searchParams.orderby,
      order: searchParams.order,
    }),
    getCategories(),
  ]);

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {searchParams.search ? `Search: "${searchParams.search}"` : 'All Products'}
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar categories={categories} totalProducts={productsData.total} />
          <div className="flex-1">
            <ProductGrid products={productsData.data} />
            <Pagination currentPage={page} totalPages={productsData.totalPages} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}