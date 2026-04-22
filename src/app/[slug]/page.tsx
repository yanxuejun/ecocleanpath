import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPages } from '@/lib/woocommerce';

const POLICY_SLUGS = [
  'shipping-policy', 'refund-policy', 'privacy-policy', 'terms-and-conditions', 'trademark-disclaimer'
];

export async function generateStaticParams() {
  return POLICY_SLUGS.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const titles: Record<string, string> = {
    'shipping-policy': 'Shipping Policy',
    'refund-policy': 'Refund Policy',
    'privacy-policy': 'Privacy Policy',
    'terms-and-conditions': 'Terms & Conditions',
    'trademark-disclaimer': 'Trademark Disclaimer',
  };
  return { title: titles[params.slug] || params.slug };
}

export default async function PolicyPage({ params }: { params: { slug: string } }) {
  let content = '';
  try {
    const pages = await getPages();
    const page = pages.find(p => p.slug === params.slug);
    if (page) content = page.content.rendered;
  } catch {}

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          {{
            'shipping-policy': 'Shipping Policy',
            'refund-policy': 'Refund Policy',
            'privacy-policy': 'Privacy Policy',
            'terms-and-conditions': 'Terms & Conditions',
            'trademark-disclaimer': 'Trademark Disclaimer',
          }[params.slug] || params.slug}
        </h1>
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