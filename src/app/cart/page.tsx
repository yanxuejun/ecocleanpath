import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartContent from '@/components/CartContent';

export const metadata: Metadata = { title: 'Cart', description: 'Your shopping cart.' };

export default function CartPage() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h1>
        <CartContent />
      </main>
      <Footer />
    </>
  );
}