import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CheckoutForm from './CheckoutForm';

export const metadata: Metadata = { title: 'Checkout', description: 'Complete your order.' };

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>
        <CheckoutForm />
      </main>
      <Footer />
    </>
  );
}
