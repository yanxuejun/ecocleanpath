import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import FilterSidebar from '@/components/FilterSidebar';
import Pagination from '@/components/Pagination';
import { getProducts, getCategories, getCategoryBySlug } from '@/lib/woocommerce';

interface Props {
  params: { category: string };
  searchParams: { page?: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = await getCategoryBySlug(params.category);
  return { title: cat?.name || 'Category', description: `Browse ${cat?.name} products.` };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const page = parseInt(searchParams.page || '1');
  const [categories, productsData] = await Promise.all([
    getCategories(),
    getProducts({ page, per_page: 12, category: params.category }),
  ]);
  const cat = await getCategoryBySlug(params.category);

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{cat?.name || 'Category'}</h1>
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