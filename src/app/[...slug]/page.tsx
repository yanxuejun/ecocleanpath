import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPages } from '@/lib/woocommerce';
import { notFound } from 'next/navigation';

interface Props {
  params: { slug: string };
}

const PAGE_SLUGS: Record<string, string> = {
  'about-us': 'About Us',
  'contact': 'Contact',
  'blog': 'Blog',
  'order-tracking': 'Order Tracking',
  'shipping-policy': 'Shipping Policy',
  'refund-policy': 'Refund Policy',
  'privacy-policy': 'Privacy Policy',
  'terms-and-conditions': 'Terms and Conditions',
  'trademark-disclaimer': 'Trademark Disclaimer',
  'wishlist': 'Wishlist',
  'my-account': 'My Account',
};

export async function generateStaticParams() {
  return Object.keys(PAGE_SLUGS).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const title = PAGE_SLUGS[params.slug] || params.slug;
  return { title, description: `${title} - EcoCleanPath` };
}

export default async function StaticPage({ params }: Props) {
  const slug = params.slug;
  const title = PAGE_SLUGS[slug] || slug;

  let content = '';
  try {
    const pages = await getPages();
    const page = pages.find(p => p.link.includes(`/${slug}/`) || p.slug === slug);
    if (page) {
      content = page.content.rendered;
    }
  } catch { /* fallthrough */ }

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">{title}</h1>
        {content ? (
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
        ) : (
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <p className="text-gray-500">Page content coming soon.</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}