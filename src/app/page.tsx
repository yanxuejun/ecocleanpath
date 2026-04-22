export const runtime = 'edge';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import ProductGrid from '@/components/ProductGrid';
import CategoryCard from '@/components/CategoryCard';
import { getProducts, getCategories } from '@/lib/woocommerce';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'ecocleanpath-headless', template: '%s | EcoCleanPath' },
  description: 'High-quality robot vacuum accessories and replacement parts. Compatible with Ecovacs, Roborock, Tineco, Bissell, Eufy, Karcher, Qihoo, and Shark.',
};

export default async function HomePage() {
  const [featuredData, categories] = await Promise.all([
    getProducts({ per_page: 8 }),
    getCategories(),
  ]);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white">
          <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Premium Robot Vacuum Parts & Accessories
              </h1>
              <p className="text-lg text-primary-100 mb-8">
                Compatible with Ecovacs, Roborock, Tineco, Bissell, Eufy, Karcher, Qihoo, and Shark.
                Factory-quality replacement parts at the best prices.
              </p>
              <div className="flex gap-3 flex-wrap">
                <a href="/shop" className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
                  Shop Now
                </a>
                <a href="/about-us" className="border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Shop by Brand</h2>
          {categories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.filter(c => c.count > 0).map(c => <CategoryCard key={c.id} category={c} />)}
            </div>
          ) : (
            <BrandGridFallback />
          )}
        </section>

        {/* Featured Products */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
            <a href="/shop" className="text-primary-500 hover:text-primary-600 font-medium text-sm">View All &rarr;</a>
          </div>
          <ProductGrid products={featuredData.data} />
        </section>

        {/* Trust badges */}
        <section className="bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { icon: '🚚', label: 'Fast Shipping', desc: 'Same day dispatch' },
                { icon: '✓', label: 'Quality Parts', desc: 'Factory quality guaranteed' },
                { icon: '↩', label: 'Easy Returns', desc: '30-day return policy' },
                { icon: '🔒', label: 'Secure Checkout', desc: 'SSL encrypted payment' },
              ].map(item => (
                <div key={item.label} className="space-y-1">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="font-semibold text-gray-800">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-12">
          <Newsletter />
        </section>
      </main>
      <Footer />
    </>
  );
}

// Hardcoded brand grid fallback when API is unreachable
function BrandGridFallback() {
  const brands = [
    { name: 'For Ecovacs', slug: 'for-ecovacs', count: 1238, color: '#1565C0' },
    { name: 'For Bissell', slug: 'for-bissell', count: 282, color: '#558B2F' },
    { name: 'For Tineco', slug: 'for-tineco', count: 218, color: '#E65100' },
    { name: 'For Roborock', slug: 'for-roborock', count: 178, color: '#6A1B9A' },
    { name: 'For Eufy', slug: 'for-eufy', count: 56, color: '#283593' },
    { name: 'For Qihoo', slug: 'for-qihoo', count: 36, color: '#AD1457' },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {brands.map(b => (
        <a key={b.slug} href={`/shop/${b.slug}`}
          className="group block p-5 rounded-xl border border-gray-200 hover:border-primary-500 hover:shadow-md transition-all">
          <div className="w-8 h-8 rounded-lg mb-3" style={{ backgroundColor: b.color + '20' }}>
            <div className="w-full h-full rounded-lg" style={{ backgroundColor: b.color }} />
          </div>
          <p className="font-semibold text-gray-800 group-hover:text-primary-600">{b.name}</p>
          <p className="text-sm text-gray-500 mt-1">{b.count} products</p>
        </a>
      ))}
    </div>
  );
}
