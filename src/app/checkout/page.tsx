import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

'use client';
import { useState } from 'react';
import { useCartStore } from '@/lib/cart';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function CheckoutForm() {
  const items = useCartStore(s => s.items);
  const getTotal = useCartStore(s => s.getTotal);
  const clearCart = useCartStore(s => s.clearCart);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderResult, setOrderResult] = useState<{ id: number; number: string } | null>(null);
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', phone: '', address_1: '', address_2: '',
    city: '', state: '', postcode: '', country: 'US',
  });

  if (!items.length && !orderResult) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">Your cart is empty.</p>
        <Link href="/shop" className="btn-primary inline-block">Go Shopping</Link>
      </div>
    );
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ecocleanpath.com'}/wp-json/wc/v3/orders`, {
        method: 'POST',
        headers: {
          Authorization: 'Basic ' + Buffer.from(`${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`).toString('base64'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payment_method: 'bacs',
          payment_method_title: 'Direct Bank Transfer',
          billing: form,
          line_items: items.map(i => ({ product_id: i.product_id, quantity: i.quantity })),
        }),
      });
      if (res.ok) {
        const order = await res.json();
        clearCart();
        setOrderResult({ id: order.id, number: order.number });
      }
    } finally {
      setLoading(false);
    }
  };

  if (orderResult) {
    return (
      <div className="text-center py-12 bg-green-50 rounded-xl border border-green-200">
        <p className="text-4xl mb-4">✓</p>
        <h2 className="text-2xl font-bold text-green-700 mb-2">Order Placed!</h2>
        <p className="text-gray-600 mb-6">Order #{orderResult.number}</p>
        <Link href="/shop" className="btn-primary inline-block">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div>
      {/* Steps */}
      <div className="flex gap-2 mb-8">
        {['Shipping', 'Payment'].map((label, i) => (
          <div key={label} className={`flex-1 h-1 rounded-full ${step > i ? 'bg-primary-500' : 'bg-gray-200'}`} />
        ))}
      </div>

      {step === 1 && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-lg">Shipping Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field label="First Name *" name="first_name" value={form.first_name} onChange={handleInput} />
            <Field label="Last Name *" name="last_name" value={form.last_name} onChange={handleInput} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Email *" name="email" type="email" value={form.email} onChange={handleInput} />
            <Field label="Phone *" name="phone" type="tel" value={form.phone} onChange={handleInput} />
          </div>
          <Field label="Address *" name="address_1" value={form.address_1} onChange={handleInput} />
          <Field label="Apartment, suite, etc." name="address_2" value={form.address_2} onChange={handleInput} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="City *" name="city" value={form.city} onChange={handleInput} />
            <Field label="State *" name="state" value={form.state} onChange={handleInput} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="ZIP Code *" name="postcode" value={form.postcode} onChange={handleInput} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
              <select name="country" value={form.country} onChange={handleInput} className="input-field">
                <option value="US">United States</option>
                <option value="GB">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
              </select>
            </div>
          </div>
          <button onClick={() => setStep(2)} className="btn-primary w-full py-3">Continue to Payment</button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
            {items.map(item => (
              <div key={item.id} className="flex justify-between text-sm py-2 border-b border-gray-100 last:border-0">
                <span className="text-gray-600">{item.name} × {item.quantity}</span>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
              <span>Total</span>
              <span className="text-primary-600">${getTotal().toFixed(2)}</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-lg mb-4">Payment Method</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-700">Direct Bank Transfer (BACSS)</p>
            </div>
            <button onClick={handlePlaceOrder} disabled={loading} className="btn-primary w-full py-3">
              {loading ? 'Processing...' : `Place Order — $${getTotal().toFixed(2)}`}
            </button>
            <button onClick={() => setStep(1)} className="btn-secondary w-full mt-3">Back to Shipping</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, name, value, onChange, type = 'text' }: { label: string; name: string; value: string; onChange: (e: any) => void; type?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input name={name} type={type} value={value} onChange={onChange} className="input-field" required />
    </div>
  );
}