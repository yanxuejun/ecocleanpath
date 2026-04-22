'use client';
import { useState } from 'react';

export default function OrderTracker() {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ecocleanpath.com'}/wp-json/wc/v3/orders/${orderId}` +
        `?consumer_key=${process.env.WC_CONSUMER_KEY}&consumer_secret=${process.env.WC_CONSUMER_SECRET}`
      );
      if (res.ok) {
        const data = await res.json();
        setOrders([data]);
      } else {
        setError('Order not found.');
        setOrders([]);
      }
    } catch {
      setError('Failed to fetch order.');
    } finally {
      setLoading(false);
    }
  };

  const STATUS_COLORS: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    processing: 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
    refunded: 'bg-gray-100 text-gray-700',
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Order Number</label>
          <input type="text" value={orderId} onChange={e => setOrderId(e.target.value)} className="input-field" placeholder="e.g. 1234" required />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? 'Searching...' : 'Track Order'}
        </button>
      </form>

      {orders.map(order => (
        <div key={order.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-500">Order #{order.number}</p>
              <p className="text-sm text-gray-500">{new Date(order.date_created).toLocaleDateString()}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-700'}`}>
              {order.status}
            </span>
          </div>
          <div className="border-t border-gray-100 pt-4 space-y-2">
            {order.line_items?.map((item: any, i: number) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-gray-600">{item.name} × {item.quantity}</span>
                <span className="font-medium">${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-bold mt-4 pt-4 border-t border-gray-100">
            <span>Total</span>
            <span className="text-primary-600">${order.total}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
