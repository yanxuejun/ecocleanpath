import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OrderTracker from './OrderTracker';

export const metadata: Metadata = { title: 'Order Tracking', description: 'Track your order status.' };

export default function OrderTrackingPage() {
  return (
    <>
      <Header />
      <main className="max-w-md mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Track Your Order</h1>
        <OrderTracker />
      </main>
      <Footer />
    </>
  );
}
